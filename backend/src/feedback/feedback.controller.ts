import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { AuthorizedGuard } from '../guards/authorized.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/:carId')
  getByCarId(@Param('carId') carId: string) {
    return this.feedbackService.getFeedbackForCar(carId);
  }

  @UseGuards(AuthorizedGuard)
  @Post('/')
  createForCar(@User() user: UserModel, @Body() body: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(user, body);
  }
}
