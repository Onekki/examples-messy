import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InitDto } from './app.dto';
import { TCourse } from './feature/course/course.entity';
import { TQuestion } from './feature/question/question.entity';
import { QuestionService } from './feature/question/question.service';
import { TUser } from './feature/user/user.entity';
import { CourseService } from './feature/course/course.service';
import { NjceduService } from './shared/api/njcedu.service';
import { UserService } from './feature/user/user.service';

@Injectable()
export class AppService {
    constructor(
        private readonly userService: UserService,
        private readonly courseService: CourseService,
        private readonly questionService: QuestionService,
        private readonly njceduService: NjceduService
    ) {}

    async init(initDto: InitDto) {
        const { username, password } = initDto;
        const { lUserId, realname, loginUrl, token } = await this.njceduService.getLoginUrl(username, password);
        const { schoolToken } = await this.njceduService.getSchoolToken(loginUrl, lUserId, token);
        const { lGradeId, lClassId, taskId } = await this.njceduService.getTask(lUserId, token, schoolToken);
        const courseList: TCourse[] = await this.njceduService.getCourseList(taskId, lUserId, token, schoolToken);
        return "test";
        for (const course of courseList) {
            await this.courseService.saveOrUpdate(course);
            const afterQuestionList: TQuestion[] = await this.njceduService.getAfterQuestionList(course.code, lUserId, token);
            for (const question of afterQuestionList) {
                await this.questionService.saveOrUpdate(question);
            }
        }
        return "OK";
    }
}
