import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

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
