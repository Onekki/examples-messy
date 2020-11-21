import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../../common/common.module';
import { SiteService } from './site.service';
import { JcwService } from './jcw/jcw.service';
import { SiteController } from './site.controller';
import { TSite } from './site.entity';
import { SiteView } from './site.view';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TSite]), CommonModule, UserModule],
  providers: [SiteService, JcwService],
  controllers: [SiteController, SiteView]
})
export class SiteModule {}
