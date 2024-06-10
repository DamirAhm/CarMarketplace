import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuth } from '../../../../common/interfaces/auth/auth.interface';

export class AuthDto implements IAuth {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
