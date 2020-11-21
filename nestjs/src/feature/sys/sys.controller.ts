import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthLoginDto, AuthRegDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import {UserService} from './service/user.service';

@Controller('api')
export class SysController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() dto: AuthLoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checkLogin')
  async info() {
      return { msg: 'success' };
  }

  // @Post('auth/register')
  // async register(@Body() dto: AuthRegDto) {
  //   return await this.authService.register(dto);
  // }
}
