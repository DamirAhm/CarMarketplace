import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateAdvertismentDto } from './dto/CreateAdvertisment.dto';

@Injectable()
export class AdvertismentsService {
  constructor(private readonly prismaService: PrismaService) {}

  createAdvertisment(user: User, body: CreateAdvertismentDto) {
    return this.prismaService.advertisment.create({
      data: {
        ...body,
        creator: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}
