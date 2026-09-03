import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { USER_ROLES } from './create-user.dto';
import type { UserRoleDto } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRoleDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}