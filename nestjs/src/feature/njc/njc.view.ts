import {
  Controller,
  Get,
  Param,
  Render,
  Request,
} from '@nestjs/common';
import { TNjcUser } from './entity/t_njc_user';
import { NjcService } from './njc.service';
import { TNjcStudy } from './entity/t_njc_study';

@Controller('njc')
export class NjcView {
  constructor(private readonly njcService: NjcService) {}

  @Get()
  @Render('njc/list')
  async list(@Request() req) {
    const sysUserId = req.cookies.sysUserId;
    const njcUsers: TNjcUser[] = await this.njcService.list(sysUserId);
    return { title: '新锦城', data: { njcUsers } };
  }

  @Get('add')
  @Render('njc/add')
  async add() {
    return { title: '新锦城' };
  }

  @Get('detail/:id')
  @Render('njc/detail')
  async detail(@Param('id') id: string) {
    const studies: TNjcStudy[] = await this.njcService.detail(id);
    return { title: '新锦城', data: { studies } };
  }
}
