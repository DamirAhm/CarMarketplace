import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AUTH_COOKIE_NAME } from './constants';
import { compare } from 'bcrypt';
import { IRegister } from '../../../common/interfaces/auth/register.interface';
import { IAuth } from '../../../common/interfaces/auth/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(response: Response, { email, password, ...rest }: IRegister) {
    const userWithSameLogin = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameLogin) {
      throw new BadRequestException(
        'Пользователь с таким адресом уже существует',
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        email,
        login: email.split('@')[0],
        password: hashedPassword,
      },
    });

    await this.setAuthCookie(response, email);

    return user;
  }

  async login(response: Response, { email, password }: IAuth) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    const isPasswordsIdentical = await compare(password, user?.password || '');

    if (!isPasswordsIdentical) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    await this.setAuthCookie(response, email);

    return user;
  }

  logout(response: Response) {
    return response.clearCookie(AUTH_COOKIE_NAME, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  }

  private async setAuthCookie(response: Response, email: string) {
    const jwt = await this.jwtService.signAsync({
      email,
    });

    return response.cookie(AUTH_COOKIE_NAME, jwt, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }
}
