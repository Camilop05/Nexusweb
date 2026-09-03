import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const USER_ROLES = ['ADMIN', 'USER', 'SUPERVISOR'] as const;
export type UserRoleDto = (typeof USER_ROLES)[number];

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRoleDto;
}