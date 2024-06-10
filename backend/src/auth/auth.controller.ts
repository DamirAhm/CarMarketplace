import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() body: RegisterDto,
  ) {
    const user = await this.authService.register(response, body);
    return response.send(user);
  }

  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() body: AuthDto,
  ) {
    this.authService.logout(response);

    const user = await this.authService.login(response, body);

    return response.send(user);
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }
}
