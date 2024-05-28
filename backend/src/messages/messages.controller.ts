import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthorizedGuard } from '../guards/authorized.guard';
import { User as UserModel } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { SendMessageDto } from './dto/SendMessage.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthorizedGuard)
  @Post()
  sendMessage(@User() user: UserModel, @Body() body: SendMessageDto) {
    return this.messagesService.sendMessage(user, body);
  }

  @UseGuards(AuthorizedGuard)
  @Put('/:messageId')
  editMessage(
    @User() user: UserModel,
    @Param('messageId') messageId: string,
    @Body() body: SendMessageDto,
  ) {
    return this.messagesService.editMessage(user, messageId, body);
  }

  @UseGuards(AuthorizedGuard)
  @Delete('/:messageId')
  deleteMessage(
    @User() user: UserModel,
    @Param('messageId') messageId: string,
  ) {
    return this.messagesService.deleteMessage(user, messageId);
  }
}
