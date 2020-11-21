import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { NjcService } from './njc.service';
import { UserSaveDto } from './njc.dto';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/njc')
export class NjcController {

  constructor(private readonly njcService: NjcService) {}

  @Get('init')
  async init() {
    const username = 'yzu-151302123';
    const password = '123456';
    return await this.njcService.init({ username, password });
  }

  @Post('bind')
  async bind(@Body() dto: UserSaveDto) {
    return await this.njcService.bind(dto);
  }

  @Post('study/:courseCode')
  async study(@Param('courseCode') courseCode: string, @Query('video') video: number) {
    return await this.njcService.study(courseCode, video);
  }
}
