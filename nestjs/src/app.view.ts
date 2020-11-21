import {Controller, Get, Render, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from '@nestjs/passport';

@Controller()
export class AppView {

  @Get('')
  @Get('index')
  @Render('index')
  index() {
    return { title: '首页' };
  }

  @Get('login')
  @Render('login')
  login() {
    return { title: '登陆 Sugar' };
  }

  @Get('register')
  @Render('register')
  register() {
    return { title: '注册 Sugar' };
  }
}

