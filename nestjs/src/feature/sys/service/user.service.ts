import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TSysUser } from '../entity/t_sys_user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TSysUser) private readonly userRepo: Repository<TSysUser>,
  ) { }

  async save(user: TSysUser) {
    return await this.userRepo.save(this.userRepo.create(user));
  }

  async test() {
    return '1';
  }

  async getByEmail(email: string) {
    console.log(email)
    return await this.userRepo.findOne({ email });
  }
}
