import { Module } from '@nestjs/common';
import { JcwController } from './jcw.controller';
import { JcwService } from './jcw.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JcwCourse } from './entity/jcw_course.entity';
import { JcwUser } from './entity/jcw_user.entity';
import { UserModule } from '../sys/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([JcwUser, JcwCourse]), UserModule],
  controllers: [JcwController],
  providers: [JcwService],
})
export class JcwModule {
}
