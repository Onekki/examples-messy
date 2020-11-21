import { Module } from '@nestjs/common';
import { NjcController } from './njc.controller';
import { NjcView } from './njc.view';
import { NjcService } from './njc.service';
import { NjcApi } from './njc.api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TNjcUser } from './entity/t_njc_user';
import { TNjcStudy } from './entity/t_njc_study';
import { TNjcAnswer } from './entity/t_njc_answer';

@Module({
  imports: [TypeOrmModule.forFeature([TNjcUser, TNjcStudy, TNjcAnswer])],
  controllers: [NjcController, NjcView],
  providers: [NjcApi, NjcService],
  exports: [NjcService],
})
export class NjcModule {}
