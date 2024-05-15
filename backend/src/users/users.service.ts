import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { IUpdateUser } from '../../../common/interfaces/users/updateUser.interface';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

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
