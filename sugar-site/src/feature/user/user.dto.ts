import { IsNumber } from "class-validator/decorator/decorators";


export class UserListDto {
  @IsNumber()
  readonly offset: number;

  @IsNumber()
  readonly size: number;
}