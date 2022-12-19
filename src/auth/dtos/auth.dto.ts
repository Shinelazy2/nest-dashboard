import { RoleType } from './../types/roles.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  hash?: string;

  @IsEnum(RoleType)
  role?: RoleType;
}
