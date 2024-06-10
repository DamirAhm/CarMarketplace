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

    return this.prismaService.$transaction(
      [
        this.prismaService.view.upsert({
          where: {
            advertismentId_userId: {
              advertismentId,
              userId: user.id,
            },
          },
          update: {},
          create: {
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
        }),
      ],
      {
        isolationLevel: 'Serializable',
      },
    );
  }
}
