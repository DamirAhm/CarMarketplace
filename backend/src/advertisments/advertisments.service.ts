import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ICreateAdvertisment } from '../../../common/interfaces/advertisments/createAdvertisment.interface';
import { SearchAdvertismentsDto } from './dto/SearchAdvertisments.dto';

@Injectable()
export class AdvertismentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAdvertisments({
    mileage,
    mileageTo,
    year,
    yearTo,
    engineVolume,
    engineVolumeTo,
    cost,
    costTo,
    ...rest
  }: SearchAdvertismentsDto) {
    const ads = await this.prismaService.advertisment.findMany({
      include: {
        imageIds: true,
      },
      where: {
        mileage: {
          lte: mileageTo,
          gte: mileage,
        },
        cost: {
          lte: costTo,
          gte: cost,
        },
        year: {
          lte: yearTo,
          gte: year,
        },
        engineVolume: {
          lte: engineVolumeTo,
          gte: engineVolume,
        },
        ...rest,
      },
    });

    return ads.map(({ imageIds, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
    }));
  }

  createAdvertisment(user: User, { imageId, ...body }: ICreateAdvertisment) {
    return this.prismaService.advertisment.create({
      data: {
        ...body,
        creator: {
          connect: {
            id: user.id,
          },
        },
        imageIds: imageId
          ? {
              connect: {
                id: imageId,
              },
            }
          : undefined,
      },
    });
  }

  async getUsersAdvertisements(user: User) {
    const ads = await this.prismaService.advertisment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        imageIds: true,
      },
    });

    return ads.map(({ imageIds, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
    }));
  }

  async deleteAdvertisment(id: string, user: User) {
    const ad = await this.prismaService.advertisment.findUnique({
      where: {
        id,
      },
    });

    if (ad.userId !== user.id) {
      throw new ForbiddenException(
        'Не достаточно прав для удаления объявления',
      );
    }

    await this.prismaService.advertisment.delete({
      where: {
        id,
      },
    });
  }
}
