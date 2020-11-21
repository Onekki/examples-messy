import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthLoginDto, AuthRegDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: AuthRegDto) {
    return await this.authService.register(dto);
  }
}
