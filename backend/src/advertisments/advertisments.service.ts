import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ICreateAdvertisment } from '../../../common/interfaces/advertisments/createAdvertisment.interface';
import { SearchAdvertismentsDto } from './dto/SearchAdvertisments.dto';
import { IEditAdvertisment } from '../../../common/interfaces/advertisments/editAdvertisment.interface';

const include = {
  imageIds: true,
  car: true,
  views: true,
  favorites: true,
  creator: {
    include: {
      avatar: true,
    },
  },
};

@Injectable()
export class AdvertismentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAdvertisment(advertismentId: string) {
    const { imageIds, creator, ...rest } =
      await this.prismaService.advertisment.findUniqueOrThrow({
        include,
        where: {
          id: advertismentId,
        },
      });

    return {
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
      creator: {
        ...creator,
        avatar: creator.avatar[0]?.id,
      },
    };
  }

  async getAdvertisments({
    mileage,
    mileageTo,
    year,
    yearTo,
    engineVolume,
    engineVolumeTo,
    cost,
    costTo,
    currency,
    description,
    ...rest
  }: SearchAdvertismentsDto) {
    const ads = await this.prismaService.advertisment.findMany({
      include,
      where: {
        currency,
        description,
        cost: {
          lte: costTo,
          gte: cost,
        },
        mileage: {
          lte: mileageTo,
          gte: mileage,
        },
        car: {
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
      },
    });

    return ads.map(({ imageIds, creator, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
      creator: {
        ...creator,
        avatar: creator.avatar[0]?.id,
      },
    }));
  }

  async getRecommendations() {
    const ads = await this.prismaService.advertisment.findMany({
      include,
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return ads.map(({ imageIds, creator, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
      creator: {
        ...creator,
        avatar: creator.avatar[0]?.id,
      },
    }));
  }

  async getFavorites(user: User) {
    const ads = await this.prismaService.advertisment.findMany({
      include,
      where: {
        favorites: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    return ads.map(({ imageIds, creator, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
      creator: {
        ...creator,
        avatar: creator.avatar[0]?.id,
      },
    }));
  }

  createAdvertisment(
    user: User,
    {
      imageIds,
      cost,
      currency,
      mileage,
      description,
      ...body
    }: ICreateAdvertisment,
  ) {
    return this.prismaService.advertisment.create({
      data: {
        cost,
        currency,
        mileage,
        description,
        creator: {
          connect: {
            id: user.id,
          },
        },
        car: {
          connectOrCreate: {
            where: {
              brand_model_year_engineType_transmission: {
                brand: body.brand,
                model: body.model,
                year: body.year,
                engineType: body.engineType,
                transmission: body.transmission,
              },
            },
            create: body,
          },
        },
        imageIds: imageIds
          ? {
              connect: imageIds.map((id) => ({
                id: id,
              })),
            }
          : undefined,
      },
    });
  }

  async editAdvertisment(
    user: User,
    id: string,
    {
      imageIds,
      cost,
      currency,
      mileage,
      description,
      ...body
    }: IEditAdvertisment,
  ) {
    const ad = await this.prismaService.advertisment
      .findUniqueOrThrow({
        include: {
          imageIds: true,
        },
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Объявление не найдено');
      });

    if (ad.userId !== user.id) {
      throw new ForbiddenException('Объявление вам не принадлежит');
    }

    const { imageIds: oldImages } = ad;

    const imagesToDelete = oldImages
      .filter((im) => !imageIds.includes(im.id))
      .map(({ id }) => ({ id }));

    await this.prismaService.image.deleteMany({
      where: {
        OR: imagesToDelete,
      },
    });

    return this.prismaService.advertisment.update({
      where: {
        id,
      },
      data: {
        cost,
        currency,
        mileage,
        description,
        creator: {
          connect: {
            id: user.id,
          },
        },
        car: {
          connectOrCreate: {
            where: {
              brand_model_year_engineType_transmission: {
                brand: body.brand,
                model: body.model,
                year: body.year,
                engineType: body.engineType,
                transmission: body.transmission,
              },
            },
            create: body,
          },
        },
        imageIds: imageIds
          ? {
              connect: imageIds.map((id) => ({
                id: id,
              })),
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
      include,
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
