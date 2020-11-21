import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TUser } from '../user/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }) ,
    JwtModule.register({
      secretOrPrivateKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ=',
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
