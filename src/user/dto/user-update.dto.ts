import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  oldPassword: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain at least 1 upper case letter, 1 lower case letter, 1 number or special character',
  })
  newPassword: string;
}
