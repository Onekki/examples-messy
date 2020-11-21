import { Body, Controller, Get } from '@nestjs/common';
import { RecordListDto, RecordUpdateDto } from './record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {

    constructor(
        private readonly recordService: RecordService
    ) {}

    @Get('list')
    list(@Body() recordListDto: RecordListDto) {
        return this.recordService.listByTaskCode(recordListDto);
    }

    @Get('update')
    update(@Body() recordUpdateDto: RecordUpdateDto) {
        return this.recordService.updateVideo(recordUpdateDto)
    }
}
