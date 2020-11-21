import {Module} from '@nestjs/common';
import { NjceduService } from '../../shared/api/njcedu.service';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {ApiModule} from "../../shared/api/api.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TUser} from "./user.entity";
import {CourseModule} from "../course/course.module";

@Module({
  imports: [TypeOrmModule.forFeature([TUser]), ApiModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
