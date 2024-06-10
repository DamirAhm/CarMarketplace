import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ICreateComment } from '../../../common/interfaces/comments/createComment.interface';
import { IEditComment } from '../../../common/interfaces/comments/editComment.interface';
import { UserRole } from '../../../common/constants/UserRole';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(user: User, { text, feedbackId }: ICreateComment) {
    await this.prismaService.feedback
      .findUniqueOrThrow({
        where: {
          id: feedbackId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Отзыв не найден');
      });

    const comment = await this.prismaService.comment.create({
      include: {
        user: {
          include: {
            avatar: true,
          },
        },
      },
      data: {
        feedback: {
          connect: {
            id: feedbackId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        text,
      },
    });

    return {
      ...comment,
      user: {
        ...comment.user,
        avatar: comment.user.avatar[0]?.id,
      },
    };
  }

  async editComment(user: User, commentId: string, { text }: IEditComment) {
    const { userId } = await this.prismaService.comment
      .findUniqueOrThrow({
        where: {
          id: commentId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Комментарий не найден');
      });

    if (userId !== user.id && user.role === UserRole.Regular) {
      throw new ForbiddenException(
        'Недстаточно прав для редактирования комментария',
      );
    }

    const comment = await this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      include: {
        user: {
          include: {
            avatar: true,
          },
        },
      },
      data: {
        text,
      },
    });

    return {
      ...comment,
      user: {
        ...comment.user,
        avatar: comment.user.avatar[0]?.id,
      },
    };
  }

  async deleteComment(user: User, commentId: string) {
    const { userId } = await this.prismaService.comment
      .findUniqueOrThrow({
        where: {
          id: commentId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Комментарий не найден');
      });

    if (userId !== user.id && user.role === UserRole.Regular) {
      throw new ForbiddenException(
        'Недстаточно прав для редактирования комментария',
      );
    }

    await this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
