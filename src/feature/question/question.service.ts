import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { TCourse } from '../course/course.entity';
import {TQuestion} from "./question.entity";
import {Repository} from "typeorm";
import {NjceduService} from "../../shared/api/njcedu.service";

@Injectable()
export class QuestionService {

    constructor(
       @InjectRepository(TQuestion) private readonly questionRepo: Repository<TQuestion>
    ) {}

    async saveOrUpdate(tQuestion: TQuestion) {
        const question = await this.questionRepo.findOne({ code: tQuestion.code })
        if(!question) {
            return await this.questionRepo.save(this.questionRepo.create(tQuestion))
        }
        return  await this.questionRepo.update(question, tQuestion);
    }

}
