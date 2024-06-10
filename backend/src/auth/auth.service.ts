import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AUTH_COOKIE_NAME } from '../../../common/constants/AuthCookie';
import { compare } from 'bcrypt';
import { IRegister } from '../../../common/interfaces/auth/register.interface';
import { IAuth } from '../../../common/interfaces/auth/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    response: Response,
    { email, password, phoneNumber, login }: IRegister,
  ) {
    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    const userWithSamePhoneNumber = await this.prismaService.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (userWithSameEmail) {
      throw new BadRequestException(
        'Пользователь с таким адресом уже существует',
      );
    }
    if (userWithSamePhoneNumber) {
      throw new BadRequestException(
        'Пользователь с таким номером телефона уже существует',
      );
    }

    const hashedPassword = await hashPassword(password);

    const { avatar, ...user } = await this.prismaService.user.create({
      data: {
        phoneNumber,
        email,
        login,
        password: hashedPassword,
      },
      include: {
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });

    await this.setAuthCookie(response, email);

    return {
      ...user,
      avatar: avatar[0]?.id,
    };
  }

  async login(response: Response, { email, password }: IAuth) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });

    const isPasswordsIdentical = await compare(password, user?.password || '');

    if (!user || !isPasswordsIdentical) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const { avatar, ...rest } = user;

    await this.setAuthCookie(response, email);

    return {
      ...rest,
      avatar: avatar[0]?.id,
    };
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
