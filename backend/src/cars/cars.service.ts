import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(carId: string) {
    const images = await this.prismaService.image.findMany({
      where: {
        advertisment: {
          car: {
            id: carId,
          },
        },
      },
    });

    const car = await this.prismaService.car.findUnique({
      where: {
        id: carId,
      },
      include: {
        feedbacks: {
          include: {
            comments: {
              include: {
                user: {
                  include: {
                    avatar: true,
                  },
                },
              },
            },
            reactions: true,
          },
        },
        advertisements: {
          include: {
            imageIds: true,
            favorites: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return {
      ...car,
      images: images.map(({ id }) => id),
      advertisements: car.advertisements.map((ad) => ({
        ...ad,
        imageIds: ad.imageIds.map(({ id }) => id),
      })),
      feedbacks: car.feedbacks.map((f) => ({
        ...f,
        comments: f.comments.map((c) => ({
          ...c,
          user: {
            ...c.user,
            avatar: c.user.avatar[0]?.id,
          },
        })),
      })),
    };
  }
}
