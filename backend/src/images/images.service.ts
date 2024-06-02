import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class ImagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createImage(image: Express.Multer.File) {
    const newImage = await this.prismaService.image
      .create({
        data: {
          content: image.buffer,
          fileType: image.mimetype,
        },
      })
      .then((res) => res);

    return newImage.id;
  }

  async deleteImage(user: User, imageId: string) {
    const image = await this.prismaService.image
      .findUniqueOrThrow({
        where: {
          id: imageId,
        },
        include: {
          advertisment: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Изображение не найдено');
      });

    if (image.userId && image.userId !== user.id) {
      throw new ForbiddenException('Изображение вам не принадлежит');
    }

    if (image.advertisment && image.advertisment.userId !== user.id) {
      throw new ForbiddenException('Изображение вам не принадлежит');
    }

    await this.prismaService.image.delete({
      where: {
        id: imageId,
      },
    });
  }

  async getImage(response: Response, id: string) {
    const image = await this.prismaService.image
      .findUnique({
        where: {
          id,
        },
      })
      .then((res) => res);

    if (!image) {
      throw new NotFoundException('Изображение не найдено');
    }

    response.header('Content-Type', image.fileType);

    return image.content;
  }
}
