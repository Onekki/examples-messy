import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto, AuthRegDto } from './auth.dto';
import { TUser } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(dto: AuthLoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email)
    if(!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    if(user.password != password) {
      throw new UnauthorizedException('密码不正确');
    }

    const { id } = user;
    const payload = { id, email };
    const token = this.jwtService.sign(payload)
    return {
      ...payload,
      token
    };
  }

  async register(dto: AuthRegDto) {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email);
    if(user) {
      throw new HttpException('用户已存在', HttpStatus.CONFLICT);
    }
    var tUser = new TUser()
    tUser.email = email
    tUser.password = password
    if(!await this.userService.save(tUser)) {
      throw new HttpException("账号注册失败", HttpStatus.BAD_REQUEST)
    }
    return tUser
  }

  
}
