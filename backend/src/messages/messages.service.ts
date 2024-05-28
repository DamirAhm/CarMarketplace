import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ISendMessage } from '../../../common/interfaces/messages/SendMessage.interface';
import { IEditMessage } from '../../../common/interfaces/messages/EditMessage.interface';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async sendMessage(user: User, { message, to }: ISendMessage) {
    await this.prismaService.user
      .findUniqueOrThrow({
        where: {
          id: to,
        },
      })
      .catch(() => {
        throw new BadRequestException('Пользователь не найден');
      });

    return this.prismaService.message.create({
      data: {
        sender: {
          connect: {
            id: user.id,
          },
        },
        receiver: {
          connect: {
            id: to,
          },
        },
        message,
      },
    });
  }

  async editMessage(user: User, messageId: string, { message }: IEditMessage) {
    const messageObj = await this.prismaService.message
      .findUniqueOrThrow({
        where: {
          id: messageId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Сообщение не найдено');
      });

    if (messageObj.senderId !== user.id) {
      throw new ForbiddenException(
        'Вы не являетесь владельцем этого сообщения',
      );
    }

    if (Date.now() - messageObj.createdAt.getTime() >= 24 * 60 * 60 * 1000) {
      throw new ForbiddenException(
        'Прошло больше дня с момента отправки сообщения, редактирование недоступно',
      );
    }

    return this.prismaService.message.update({
      where: {
        id: messageId,
      },
      data: {
        message,
      },
    });
  }

  async deleteMessage(user: User, messageId: string) {
    const messageObj = await this.prismaService.message
      .findUniqueOrThrow({
        where: {
          id: messageId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Сообщение не найдено');
      });

    if (messageObj.senderId !== user.id) {
      throw new ForbiddenException(
        'Вы не являетесь владельцем этого сообщения',
      );
    }

    return this.prismaService.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
