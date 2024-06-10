import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthorizedGuard } from '../guards/authorized.guard';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { EditCommentDto } from './dto/EditComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthorizedGuard)
  @Post()
  createComment(@User() user: UserModel, @Body() body: CreateCommentDto) {
    return this.commentsService.createComment(user, body);
  }

  @UseGuards(AuthorizedGuard)
  @Put('/:commentId')
  editComment(
    @User() user: UserModel,
    @Param('commentId') commentId: string,
    @Body() body: EditCommentDto,
  ) {
    return this.commentsService.editComment(user, commentId, body);
  }

  @UseGuards(AuthorizedGuard)
  @Delete('/:commentId')
  deleteComment(
    @User() user: UserModel,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.deleteComment(user, commentId);
  }
}
