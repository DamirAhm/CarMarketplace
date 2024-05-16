import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AUTH_COOKIE_NAME } from './constants';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(response: Response, { login, password }: AuthDto) {
    const userWithSameLogin = await this.prismaService.user.findUnique({
      where: {
        login,
      },
    });

    if (userWithSameLogin) {
      throw new BadRequestException(
        'Пользователь с таким именем уже существует',
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    await this.setAuthCookie(response, login);

    return user;
  }

  async login(response: Response, { login, password }: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login,
      },
    });

    const isPasswordsIdentical = await compare(password, user?.password || '');

    if (!isPasswordsIdentical) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    await this.setAuthCookie(response, login);

    return user;
  }

  logout(response: Response) {
    return response.clearCookie(AUTH_COOKIE_NAME, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  }

  private async setAuthCookie(response: Response, login: string) {
    const jwt = await this.jwtService.signAsync({
      login,
    });

    return response.cookie(AUTH_COOKIE_NAME, jwt, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }
}
