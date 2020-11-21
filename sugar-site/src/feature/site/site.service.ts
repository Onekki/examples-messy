import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JcwService } from './jcw/jcw.service';
import { SiteAuthDto, SiteBindDto } from './site.dto';
import { TSite } from './site.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SiteService {

  constructor(
    @InjectRepository(TSite) private readonly siteRepo: Repository<TSite>,
    private readonly jcwService: JcwService,
    private readonly userService: UserService
  ){}

  async getById(id: string) {
    return await this.siteRepo.findOne({ id: id });
  }

  async findAll(): Promise<TSite[]> {
    return await this.siteRepo.createQueryBuilder("t_site")
      .leftJoinAndSelect("t_site.tUser", "tSites")
      .getMany()
  }


  async bind(bindDto: SiteBindDto) {
    const { uid, username, password, siteName } = bindDto
    let site = await this.siteRepo.findOne({ username });
    if(site) {
      return new HttpException("账号已绑定", HttpStatus.CONFLICT);
    }

    let tSite = new TSite();
    tSite.username = username;
    tSite.password = password;
    var extra: any;
    switch(siteName) {
      case 'jcw':
          extra = await this.jcwService.bind({ username, password });
          if (!extra) {
            throw new HttpException("账号或密码错误", HttpStatus.BAD_REQUEST);
          }
          tSite.static = JSON.stringify(extra.static)
          tSite.dynamic = JSON.stringify(extra.dynamic)
          tSite.name = "锦程网"
          tSite.domain = "http://sso.njcedu.com/"
          break;
    }
    if (!tSite.static) {
      throw new HttpException("不存在此网站", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    const user = await this.userService.findOneById(uid)
    if(!user) {
      throw new UnauthorizedException("登录已过期")
    }
    tSite.tUser = user
    if(!await this.siteRepo.save(this.siteRepo.create(tSite))) {
      throw new HttpException("账号激活失败", HttpStatus.BAD_REQUEST)
    }
    tSite.static = JSON.parse(tSite.static)
    tSite.dynamic = JSON.parse(tSite.dynamic)
    return tSite;
  }
}
