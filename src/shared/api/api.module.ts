import {Module} from '@nestjs/common';
import {NjceduService} from "./njcedu.service";

@Module({
    providers: [NjceduService],
    exports: [NjceduService]
})
export class ApiModule {
}
