import { Controller, Get, Render, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { title: "Sugar Site" }
  }

  @Get('login')
  @Render('login')
  login() {
    return { title: "登录Sugar Site" }
  }

  @Get('register')
  @Render('register')
  register() {
    return { title: "注册Sugar Site" }
  }
}
