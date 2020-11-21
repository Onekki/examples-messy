import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './feature/user/user.module';
import { CourseModule } from './feature/course/course.module';
import { QuestionModule } from './feature/question/question.module';
import { RecordModule } from './feature/record/record.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ApiModule } from './shared/api/api.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CourseModule, QuestionModule, RecordModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
