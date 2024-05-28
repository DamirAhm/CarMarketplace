import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addToFavorites(user: User, advertismentId: string) {
    const favoriteRecord = await this.prismaService.favorite.findFirst({
      where: {
        userId: user.id,
        advertismentId,
      },
    });

    if (favoriteRecord) {
      return favoriteRecord;
    }

    await this.prismaService.$transaction(
      [
        this.prismaService.favorite.create({
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
        }),
      ],
      { isolationLevel: 'Serializable' },
    );
  }

  async removeFromFavorites(user: User, advertismentId: string) {
    const favoriteRecord = await this.prismaService.favorite.findFirst({
      where: {
        userId: user.id,
        advertismentId,
      },
    });

    if (!favoriteRecord) {
      return;
    }

    return this.prismaService.favorite.delete({
      where: {
        advertismentId_userId: {
          userId: user.id,
          advertismentId,
        },
      },
    });
  }
}
