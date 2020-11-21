import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NjceduService } from '../../shared/api/njcedu.service';
import { RecordListDto, RecordUpdateDto } from './record.dto';
import { TRecord } from './record.entity';

@Injectable()
export class RecordService {

    constructor(
      @InjectRepository(TRecord) private readonly recordRepo: Repository<TRecord>,
      private readonly njceduService: NjceduService
    ) {}

    async listByTaskCode(recordListDto: RecordListDto) {
        const { taskCode, userCode, token, schoolToken } = recordListDto;
        const recordList: TRecord[] = await this.njceduService.getRecordList(taskCode, userCode, token, schoolToken);
        for (const record of recordList) {
            const { courseware } = await this.njceduService.getCourseware(record.courseCode, userCode, token);
            record.courseware = courseware;
            await this.saveOrUpdate(record);
        }
        return recordList
    }

    async updateVideo(recordUpdateDto: RecordUpdateDto) {
        const { courseCode, courseware, token } = recordUpdateDto;
        return await this.njceduService.updateVideo(courseCode, courseware, token);
    }

    async saveOrUpdate(tRecord: TRecord) {
        const record = await this.recordRepo.findOne({ courseCode: tRecord.courseCode })
        if(!record) {
            return await this.recordRepo.save(this.recordRepo.create(tRecord))
        }
        return  await this.recordRepo.update(record, tRecord);
    }
}
