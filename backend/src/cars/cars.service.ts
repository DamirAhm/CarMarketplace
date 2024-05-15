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
            comments: true,
            reactions: true,
          },
        },
        advertisements: {
          include: {
            _count: true,
          },
        },
      },
    });

    return {
      ...car,
      images: images.map(({ id }) => id),
      advertisements: car.advertisements.length,
    };
  }
}
