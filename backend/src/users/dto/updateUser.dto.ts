import { IUpdateUser } from '../../../../common/interfaces/users/updateUser.interface';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto implements IUpdateUser {
  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly login?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  readonly prevPassword?: string;
}
