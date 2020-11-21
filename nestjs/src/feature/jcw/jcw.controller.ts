import { Controller, Get } from '@nestjs/common';
import { JcwService } from './jcw.service';
import { BindDto } from './jcw.dto';

@Controller('jcw')
export class JcwController {
  constructor(
    private readonly jcwService: JcwService,
  ) {
  }

  @Get()
  bind(bindDto: BindDto) {
    return this.jcwService.bind(bindDto);
  }
}
