import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TCourse} from "./course.entity";
import {TUser} from "../user/user.entity";
import {NjceduService} from "../../shared/api/njcedu.service";

@Injectable()
export class CourseService {

    constructor(
        @InjectRepository(TCourse) private readonly courseRepo: Repository<TCourse>
    ) {}

    async saveOrUpdate(tCourse: TCourse) {
        const course = await this.courseRepo.findOne({ code: tCourse.code })
        if(!course) {
            return await this.courseRepo.save(this.courseRepo.create(tCourse))
        }
        return  await this.courseRepo.update(course, tCourse);
    }
}
