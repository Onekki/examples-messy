import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { InitDto, UserSaveDto } from './njc.dto';
import { NjcApi } from './njc.api';
import { TNjcUser } from './entity/t_njc_user';
import { TNjcStudy } from './entity/t_njc_study';
import { TNjcAnswer } from './entity/t_njc_answer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NjcService {
  constructor(
    @InjectRepository(TNjcUser) private readonly njcUserRepo: Repository<TNjcUser>,
    @InjectRepository(TNjcAnswer) private readonly njcAnswerRepo: Repository<TNjcAnswer>,
    @InjectRepository(TNjcStudy) private readonly njcStudyRepo: Repository<TNjcStudy>,
    private readonly njcApi: NjcApi,
  ) {}

  async init(dto: InitDto) {
    const { username, password } = dto;
    const { lUserId, realname, loginUrl, token } = await this.njcApi.getLoginUrl(username, password);
    const { schoolToken } = await this.njcApi.getSchoolToken(loginUrl, lUserId, token);
    const { lGradeId, lClassId, taskId } = await this.njcApi.getTask(lUserId, token, schoolToken);
    const studyList: TNjcStudy[] = await this.njcApi.getStudyList(taskId, lUserId, token, schoolToken);
    for (const study of studyList) {
      const { courseware } = await this.njcApi.getCourseware(study.courseCode, lUserId, token);
      study.courseware = courseware;
      await this.njcStudyRepo.save(this.njcStudyRepo.create(study));
      const afterAnswerList: TNjcAnswer[] = await this.njcApi.getAfterAnswerList(study.courseCode, lUserId, token);
      for (const answer of afterAnswerList) {
        await this.njcAnswerRepo.save(this.njcAnswerRepo.create(study));
      }
    }
    return 'OK';
  }

  async bind(dto: UserSaveDto) {
    let njcUser = await this.njcUserRepo.findOne({ username: dto.username });
    if (njcUser) {
      throw new HttpException('该账号已经被绑定', HttpStatus.CONFLICT);
    }
    const { sysUserId, username, password } = dto;
    const { lUserId, realname, loginUrl, token } = await this.njcApi.getLoginUrl(username, password);
    const { schoolToken } = await this.njcApi.getSchoolToken(loginUrl, lUserId, token);
    const { lGradeId, lClassId, taskId } = await this.njcApi.getTask(lUserId, token, schoolToken);

    const studyList: TNjcStudy[] = await this.njcApi.getStudyList(taskId, lUserId, token, schoolToken);
    for (const study of studyList) {
      const { courseware } = await this.njcApi.getCourseware(study.courseCode, lUserId, token);
      study.courseware = courseware;
      study.userCode = lUserId;
      await this.njcStudyRepo.save(this.njcStudyRepo.create(study));
      const afterAnswerList: TNjcAnswer[] = await this.njcApi.getAfterAnswerList(study.courseCode, lUserId, token);
      for (const answer of afterAnswerList) {
        const njcAnswer = await this.njcAnswerRepo.findOne(answer);
        if (njcAnswer) {
          continue;
        }
        await this.njcAnswerRepo.save(this.njcAnswerRepo.create(answer));
      }
    }

    njcUser = new TNjcUser();
    njcUser.username = username;
    njcUser.password = password;
    njcUser.realname = realname;
    njcUser.code = lUserId;
    njcUser.taskCode = taskId;
    njcUser.classCode = lClassId;
    njcUser.gradeCode = lGradeId;
    njcUser.token = token;
    njcUser.stoken = schoolToken;
    njcUser.sysUserId = sysUserId;

    await this.njcUserRepo.save(this.njcUserRepo.create(njcUser));
    return njcUser;
  }

  async list(sysUserId) {
    return await this.njcUserRepo.find({ sysUserId });
  }

  async detail(id: string) {
    const njcUser = await this.njcUserRepo.findOne({ id });
    const studyList: TNjcStudy[] = await this.njcApi.getStudyList(njcUser.taskCode, njcUser.code, njcUser.token, njcUser.stoken);
    return studyList;
  }

  async study(courseCode: string, video: number) {
    const njcStudy = await this.njcStudyRepo.findOne({ courseCode });
    const njcUser = await this.njcUserRepo.findOne({ code: njcStudy.userCode });
    for (let i = 0; i < (video + 1) / 2; i++) {
      await this.njcApi.studyVideo(courseCode, njcStudy.courseware, njcUser.token);
    }
    const answers = await this.njcAnswerRepo.find({ courseCode });
    await this.njcApi.studyAfter(njcUser.code, courseCode, njcUser.token, answers);
    return { msg: 'OK' };
  }
}
