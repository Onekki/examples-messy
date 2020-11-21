import { Controller, Get, Body, Query, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  user(@Query() offset: number, @Query() size: number ) {
    return this.userService.findAll();
  }
  
  // @Get("activeSite")
  // @Post("activeSite")
  // activieAccount() {
  //   return this.userService.activeSite({ username: "yzu-151302130", password: "123456" });
  // }

  // @Get('record')
  // grab() {
  //   return this.userService.recordStudy("yzu-151302130");
  // }
}
