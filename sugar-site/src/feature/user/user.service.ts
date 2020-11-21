import { Injectable, HttpException, HttpStatus, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TUser } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TUser) private readonly userRepo: Repository<TUser>
  ) {}

  async save(user: TUser) {
    return await this.userRepo.save(this.userRepo.create(user));
  }


  async findOneById(id: string) {
    return await this.userRepo.findOne({ id: id })
  }

  async findOneByEmail(email: string) {
    return await this.userRepo.findOne({ email: email })
  }

  async findAll(): Promise<TUser[]> {
    return await this.userRepo.createQueryBuilder("t_user")
      .leftJoinAndSelect("t_user.tSites", "tUser")
      .getMany()
  }
}
