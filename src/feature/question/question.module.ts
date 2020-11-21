import {Module} from '@nestjs/common';
import {QuestionService} from './question.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TQuestion} from "./question.entity";
import {ApiModule} from "../../shared/api/api.module";

@Module({
  imports: [TypeOrmModule.forFeature([TQuestion])],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
