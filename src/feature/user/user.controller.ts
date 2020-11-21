import { Body, Controller, Get } from '@nestjs/common';
import { UserBindDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('bind')
    bind(@Body() userBindDto: UserBindDto) {
        return this.userService.bind(userBindDto);
    }
}
