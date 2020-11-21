import { Module } from '@nestjs/common';
import { PermService } from './service/perm.service';
import { RoleService } from './service/role.service';
import { UserService } from './service/user.service';
import { SysController } from './sys.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TSysUser } from './entity/t_sys_user';
import { TSysRole } from './entity/t_sys_role';
import { TSysPerm } from './entity/t_sys_perm';
import { TSysRolePerm } from './entity/t_sys_role_perm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './service/auth.service';
import {LocalStrategy} from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ=',
      signOptions: {
        expiresIn: '12h',
      },
    }),
    TypeOrmModule.forFeature([TSysUser, TSysRole, TSysPerm, TSysRolePerm]),
  ],
  controllers: [SysController],
  providers: [LocalStrategy, JwtStrategy, AuthService, PermService, RoleService, UserService],
})
export class SysModule {}
