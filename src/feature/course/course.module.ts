import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TCourse} from "../../../output/t_course";
import {CourseService} from './course.service';
import {ApiModule} from "../../shared/api/api.module";

@Module({
    imports: [TypeOrmModule.forFeature([TCourse]), ApiModule],
    providers: [CourseService],
    exports: [CourseService]
})
export class CourseModule {}
