import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ISendMessage } from '../../../common/interfaces/messages/SendMessage.interface';
import { IEditMessage } from '../../../common/interfaces/messages/EditMessage.interface';
import { SUPPORT_USER_ID } from '../../../common/constants/ServiceUser';

const include = {
  receiver: {
    include: {
      avatar: {
        select: {
          id: true,
        },
      },
    },
  },
  sender: {
    include: {
      avatar: {
        select: {
          id: true,
        },
      },
    },
  },
};

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getChats(user: User) {
    // Получаем все сообщения, где текущий пользователь отправитель или получатель
    // и при этом это не чат с поддержкой
    const messages = await this.prismaService.message.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                senderId: user.id,
              },
              {
                receiverId: user.id,
              },
            ],
          },
          {
            NOT: {
              OR: [
                {
                  senderId: SUPPORT_USER_ID,
                },
                {
                  receiverId: SUPPORT_USER_ID,
                },
              ],
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include,
    });

    const filteredMessages = messages.filter((mes, i) => {
      const lastOfSameChat = messages.findLastIndex((m) => {
        return (
          (m.receiverId === mes.receiverId && m.senderId === mes.senderId) ||
          (m.receiverId === mes.senderId && m.senderId === mes.receiverId)
        );
      });

      return lastOfSameChat === i;
    });

    return Object.fromEntries(
      filteredMessages.map((mes) => [
        mes.receiverId,
        {
          ...mes,
          receiverId: mes.senderId === user.id ? mes.receiverId : mes.senderId,
          receiver:
            mes.senderId === user.id
              ? {
                  ...mes.receiver,
                  avatar: mes.receiver.avatar[0]?.id,
                }
              : {
                  ...mes.sender,
                  avatar: mes.sender.avatar[0]?.id,
                },
          sender: undefined,
        },
      ]),
    );
  }

  async getMessages(user: User, receiverId: string) {
    if (receiverId === user.id) {
      throw new BadRequestException(
        'Вы не можете написать сообщение самому себе',
      );
    }

    await this.prismaService.user
      .findUniqueOrThrow({
        where: {
          id: receiverId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Пользователь не найден');
      });

    const messages = await this.prismaService.message.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: user.id,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      include,
    });

    return messages.map((mes) => ({
      ...mes,
      receiver: {
        ...mes.receiver,
        avatar: mes.receiver.avatar[0]?.id,
      },
      sender: {
        ...mes.sender,
        avatar: mes.sender.avatar[0]?.id,
      },
    }));
  }

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

    const { sender, receiver, ...mes } =
      await this.prismaService.message.create({
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
        include,
      });

    return {
      ...mes,
      receiver: {
        ...receiver,
        avatar: receiver.avatar[0]?.id,
      },
      sender: {
        ...sender,
        avatar: sender.avatar[0]?.id,
      },
    };
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
      include,
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
