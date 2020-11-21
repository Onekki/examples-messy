import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteBindDto } from './site.dto';
import { JcwService } from './jcw/jcw.service';

@Controller('api/site')
export class SiteController {

  constructor(
    private readonly siteService: SiteService,
    private readonly jcwService: JcwService
  ) {}

  @Get("test")
  test() {
    return this.jcwService.test()
  }

  @Get()
  site() {
    return this.siteService.findAll()
  }

  @Post('bind')
  bind(@Body() bindDto: SiteBindDto) {
    return this.siteService.bind(bindDto);
  }
}
