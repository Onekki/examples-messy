import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NjcModule } from './feature/njc/njc.module';
import { SysModule } from './feature/sys/sys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppView } from './app.view';

@Module({
  imports: [TypeOrmModule.forRoot(), NjcModule, SysModule],
  controllers: [AppController, AppView],
  providers: [AppService],
})
export class AppModule {}
