import { IsString, IsInt, IsEmail } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class AuthRegDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
