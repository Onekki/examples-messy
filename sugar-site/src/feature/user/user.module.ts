import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TUser } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TSite } from '../site/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TUser, TSite])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
