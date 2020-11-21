import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthLoginDto, AuthRegDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { TSysUser } from '../entity/t_sys_user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(dto: AuthLoginDto) {
    const { username, password } = dto;
    const user = await this.userService.getByEmail(username);
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码不正确');
    }

    const { id } = user;
    const payload = { id, username };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.getByEmail(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async register(dto: AuthRegDto) {
    const { email, password } = dto;
    const user = await this.userService.getByEmail(email);
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.CONFLICT);
    }
    const tUser = new TSysUser()
    tUser.email = email
    tUser.password = password
    if (!await this.userService.save(tUser)) {
      throw new HttpException('账号注册失败', HttpStatus.BAD_REQUEST);
    }
    return tUser;
  }
}
