import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateFeedback } from '../../../common/interfaces/feedback/createFeedback.interface';
import { User } from '@prisma/client';
import { CreateReactionDto } from './dto/createReaction.dto';

const include = {
  reactions: true,
  imageIds: true,
  comments: true,
  user: {
    include: {
      avatar: true,
    },
  },
};

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFeedbackForCar(carId: string) {
    const feedbacks = await this.prismaService.feedback.findMany({
      where: {
        carId,
      },
      include,
    });

    return feedbacks.map(({ imageIds, user, ...rest }) => ({
      ...rest,
      imageIds: imageIds.map(({ id }) => id),
      user: {
        ...user,
        avatar: user.avatar,
      },
    }));
  }

  async createFeedback(user: User, { carId, ...body }: ICreateFeedback) {
    const {
      user: feedbackUser,
      imageIds,
      ...feedback
    } = await this.prismaService.feedback.create({
      include,
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        car: {
          connect: {
            id: carId,
          },
        },
        ...body,
      },
    });

    return {
      ...feedback,
      imageIds: imageIds.map(({ id }) => id),
      user: {
        ...feedbackUser,
        avatar: feedbackUser.avatar,
      },
    };
  }

  async addReaction(user: User, { feedbackId, opinion }: CreateReactionDto) {
    await this.prismaService.reaction.deleteMany({
      where: {
        userId: user.id,
        feedbackId,
      },
    });

    return this.prismaService.reaction.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        feedback: {
          connect: {
            id: feedbackId,
          },
        },
        opinion,
      },
    });
  }
}
