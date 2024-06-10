import { AuthDto } from './auth.dto';
import { IRegister } from '../../../../common/interfaces/auth/register.interface';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDto extends AuthDto implements IRegister {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  login: string;
}
