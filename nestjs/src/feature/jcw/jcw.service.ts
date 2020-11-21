import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BindDto } from './jcw.dto';
import { JcwUtil } from './jcw.util';
import { JcwUser } from './entity/jcw_user.entity';
import { JcwCourse } from './entity/jcw_course.entity';
import { UserService } from '../sys/user/user.service';

@Injectable()
export class JcwService {

  constructor(
    @InjectRepository(JcwUser) private readonly jcwUserRepo: Repository<JcwUser>,
    @InjectRepository(JcwCourse) private readonly jcwCourseRepo: Repository<JcwCourse>,
    private readonly sysUserService: UserService,
  ) {
  }

  async bind(bindDto: BindDto) {
    const { sysUid, username, password } = bindDto;
    const { lUserId, realname, loginUrl, token } = await JcwUtil.getLoginUrl(username, password);
    const { schoolToken } = await JcwUtil.getSchoolToken(loginUrl, lUserId, token);
    const { lGradeId, lClassId, task } = await JcwUtil.getTask(lUserId, token, schoolToken);

    const jcwUser = new JcwUser();
    jcwUser.username = username;
    jcwUser.password = password;
    jcwUser.code = lUserId;
    jcwUser.grade = lGradeId;
    jcwUser.class = lClassId;
    jcwUser.task = task;
    jcwUser.token = token;
    jcwUser.stoken = schoolToken;

    const sysUser = await this.sysUserService.getById(sysUid);
    if (!sysUser) {
      throw new UnauthorizedException('登陆已过期');
    }
    jcwUser.sysUser = sysUser;

    await this.jcwUserRepo.save(this.jcwUserRepo.create(jcwUser));

    const { courses } = await JcwUtil.getCourses(lUserId, token, schoolToken, task);
    for (const course of courses) {
      await this.jcwCourseRepo.save(this.jcwCourseRepo.create(course));
    }
    return jcwUser;
  }

}
