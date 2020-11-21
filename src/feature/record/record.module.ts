import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from '../../shared/api/api.module';
import { TRecord } from './record.entity';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TRecord]), ApiModule],
  providers: [RecordService],
  controllers: [RecordController],
  exports: [RecordService]
})
export class RecordModule {}
