import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { IUpdateUser } from '../../../common/interfaces/users/updateUser.interface';
import { compare } from 'bcrypt';
import {
  ADMIN_USER_ID,
  ADMIN_USER_LOGIN,
  ADMIN_USER_MAIL,
  ADMIN_USER_PASSWORD,
  ADMIN_USER_PHONE,
  SUPPORT_USER_ID,
  SUPPORT_USER_LOGIN,
  SUPPORT_USER_MAIL,
  SUPPORT_USER_PASSWORD,
  SUPPORT_USER_PHONE,
} from '../../../common/constants/ServiceUser';
import { hashPassword } from '../utils/hashPassword';
import { UserRole } from '../../../common/constants/UserRole';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    const supportServiceUser = await this.prismaService.user.findFirst({
      where: {
        id: SUPPORT_USER_ID,
      },
    });

    if (!supportServiceUser) {
      await this.prismaService.user.create({
        data: {
          id: SUPPORT_USER_ID,
          login: SUPPORT_USER_LOGIN,
          password: await hashPassword(SUPPORT_USER_PASSWORD),
          email: SUPPORT_USER_MAIL,
          phoneNumber: SUPPORT_USER_PHONE,
        },
      });
    }

    const adminServiceUser = await this.prismaService.user.findFirst({
      where: {
        id: ADMIN_USER_ID,
      },
    });

    if (!adminServiceUser) {
      await this.prismaService.user.create({
        data: {
          id: ADMIN_USER_ID,
          login: ADMIN_USER_LOGIN,
          password: await hashPassword(ADMIN_USER_PASSWORD),
          email: ADMIN_USER_MAIL,
          phoneNumber: ADMIN_USER_PHONE,
          role: UserRole.Admin,
        },
      });
    }
  }

  async updateUser(
    user: User,
    {
      avatar,
      password,
      prevPassword,
      email,
      phoneNumber,
      ...rest
    }: IUpdateUser,
  ) {
    if (password) {
      const isPasswordsIdentical = await compare(
        prevPassword,
        user?.password || '',
      );

      if (!isPasswordsIdentical) {
        throw new BadRequestException('Неверный пароль');
      }
    }

    if (email) {
      const userWithSameEmail = await this.prismaService.user.findUnique({
        where: {
          email,
          NOT: {
            id: user.id,
          },
        },
      });

      if (userWithSameEmail) {
        throw new BadRequestException(
          'Пользователь с таким адресом уже существует',
        );
      }
    }

    if (phoneNumber) {
      const userWithSamePhoneNumber = await this.prismaService.user.findUnique({
        where: {
          phoneNumber,
          NOT: {
            id: user.id,
          },
        },
      });

      if (userWithSamePhoneNumber) {
        throw new BadRequestException(
          'Пользователь с таким номером телефона уже существует',
        );
      }
    }

    if (avatar) {
      await this.prismaService.image.deleteMany({
        where: {
          user: {
            id: user.id,
          },
        },
      });
    }

    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...rest,
        password,
        email,
        avatar: avatar && {
          connect: {
            id: avatar,
          },
        },
      },
    });
  }
}
