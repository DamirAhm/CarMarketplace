import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';
import { CreateAdvertismentDto } from './dto/CreateAdvertisment.dto';
import { AdvertismentsService } from './advertisments.service';
import { AuthorizedGuard } from '../guards/authorized.guard';

@Controller('advertisments')
export class AdvertismentsController {
  constructor(private readonly advertismentService: AdvertismentsService) {}

  @Post()
  @UseGuards(AuthorizedGuard)
  createAdvertisment(
    @User() user: UserModel,
    @Body() body: CreateAdvertismentDto,
  ) {
    return this.advertismentService.createAdvertisment(user, body);
  }
}
