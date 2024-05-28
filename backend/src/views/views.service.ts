import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ViewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addView(user: User, advertismentId: string) {
    if (!user) {
      return null;
    }

    const viewOfUser = await this.prismaService.view.findMany({
      where: {
        advertismentId,
        userId: user.id,
      },
    });

    if (viewOfUser.length) {
      return;
    }

    return this.prismaService.view.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        advertisement: {
          connect: {
            id: advertismentId,
          },
        },
      },
    });
  }
}
