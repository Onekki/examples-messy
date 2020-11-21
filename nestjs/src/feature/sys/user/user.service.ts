import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUser } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser) private readonly sysUserRepo: Repository<SysUser>,
  ) {
  }

  async getById(id: string) {
    return await this.sysUserRepo.findOne({ id });
  }
}
