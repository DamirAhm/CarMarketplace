import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthInterface } from '../../../../common/interfaces/auth/auth.interface';

export class AuthDto implements AuthInterface {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
