import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';
import { CreateAdvertismentDto } from './dto/CreateAdvertisment.dto';
import { AdvertismentsService } from './advertisments.service';
import { AuthorizedGuard } from '../guards/authorized.guard';
import { SearchAdvertismentsDto } from './dto/SearchAdvertisments.dto';
import { EditAdvertismentDto } from './dto/EditAdvertisment.dto';

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

  @Put('/:advertismentId')
  @UseGuards(AuthorizedGuard)
  editAdvertisment(
    @User() user: UserModel,
    @Body() body: EditAdvertismentDto,
    @Param('advertismentId') advertismentId: string,
  ) {
    return this.advertismentService.editAdvertisment(
      user,
      advertismentId,
      body,
    );
  }

  @Post('/search')
  getAdvertisments(@Body() body: SearchAdvertismentsDto) {
    return this.advertismentService.getAdvertisments(body);
  }

  @Get('/recommendations')
  getRecommendations() {
    return this.advertismentService.getRecommendations();
  }

  @UseGuards(AuthorizedGuard)
  @Get('/favorites')
  getFavorites(@User() user: UserModel) {
    return this.advertismentService.getFavorites(user);
  }

  @UseGuards(AuthorizedGuard)
  @Get('/mine')
  getMyAdvertisements(@User() user: UserModel) {
    return this.advertismentService.getUsersAdvertisements(user);
  }

  @UseGuards(AuthorizedGuard)
  @Delete('/:id')
  deleteAdvertisment(@Param('id') id: string, @User() user: UserModel) {
    return this.advertismentService.deleteAdvertisment(id, user);
  }

  @Get('/:id')
  getAdvertisment(@Param('id') id: string) {
    return this.advertismentService.getAdvertisment(id);
  }
}
