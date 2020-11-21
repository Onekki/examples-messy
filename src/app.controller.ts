import { Body, Controller, Get, Param, Render } from '@nestjs/common';
import { InitDto } from './app.dto';
import { AppService } from './app.service';
import { RecordService } from './feature/record/record.service';
import { TUser } from './feature/user/user.entity';
import { UserService } from './feature/user/user.service';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly userService: UserService,
      private readonly recordService: RecordService
  ) {}

  @Get('init')
  init(@Body() initDto: InitDto) {
    return this.appService.init(initDto);
  }

  @Get()
  @Get('user')
  @Render('user')
  async index() {
    const users: TUser[] = await this.userService.list();
    return { title: "新锦城", users: users }
  }

  @Get('record/:id')
  @Render('record')
  async detail(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    const { taskCode, code, token, stoken } = user;
    const records = await this.recordService.listByTaskCode({taskCode, userCode: code, token, schoolToken: stoken});
    return { title: '学习记录', records: records }
  }
}
