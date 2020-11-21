import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './feature/sys/user/user.module';
import { JcwModule } from './feature/jcw/jcw.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), JcwModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
