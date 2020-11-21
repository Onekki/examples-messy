import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NjceduService } from '../../shared/api/njcedu.service';
import { UserBindDto } from './user.dto';
import {TUser} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(TUser) private readonly userRepo: Repository<TUser>,
        private readonly njceduService: NjceduService
    ) {}

    async list() {
        return await this.userRepo.find();
    }
    async getById(id: string) {
        return await this.userRepo.findOne({ id })
    }

    async bind(userBindDto: UserBindDto) {
        const { sysUser, username, password } = userBindDto;

        if (!sysUser) {
            throw new UnauthorizedException('请先登录');
        }

        const { lUserId, realname, loginUrl, token } = await this.njceduService.getLoginUrl(username, password);
        const { schoolToken } = await this.njceduService.getSchoolToken(loginUrl, lUserId, token);
        const { lGradeId, lClassId, taskId } = await this.njceduService.getTask(lUserId, token, schoolToken);

        const user = new TUser();
        user.username = username;
        user.password = password;
        user.code = lUserId;
        user.grade = lGradeId;
        user.class = lClassId;
        user.taskCode = taskId;
        user.token = token;
        user.stoken = schoolToken;
        user.sysUser = sysUser;

        await this.saveOrUpdate(user);

        return user;
    }

    async saveOrUpdate(tUser: TUser) {
        const user = await this.userRepo.findOne({ code: tUser.code })
        if(!user) {
            return await this.userRepo.save(this.userRepo.create(tUser))
        }
        return  await this.userRepo.update(user, tUser);
    }
}
