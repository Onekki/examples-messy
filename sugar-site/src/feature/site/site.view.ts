import { Controller, Get, Render, Param } from '@nestjs/common';
import { SiteService } from './site.service';
import { TSite } from './site.entity';

@Controller('site')
export class SiteView {

  constructor(
    private readonly siteService: SiteService
  ) {}

  @Get()
  @Render('site/site')
  site() {
    return { title: "站点" }
  }

  @Get('jcw')
  @Render('site/jcw/jcw')
  async jcw() {
    var sites: TSite[] = await this.siteService.findAll()
    sites.forEach(site => {
      site.static = JSON.parse(site.static)
    });
    return { title: "锦程网", data: sites }
  }

  @Get('jcw/add')
  @Render('site/jcw/add')
  add() {
    return { title: "添加绑定账号" }
  }

  @Get('jcw/detail/:id')
  @Render('site/jcw/detail')
  async detail(@Param('id') id: string) {
    const site = await this.siteService.getById(id);
    site.static = JSON.parse(site.static)
    site.dynamic = JSON.parse(site.dynamic)
    return { title: "网站详情", data: site }
  }
}
