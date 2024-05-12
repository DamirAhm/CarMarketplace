import { IsNotEmpty, IsString } from 'class-validator';
import { AuthInterface } from '../../../../common/interfaces/auth/auth.interface';

export class AuthDto implements AuthInterface {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
