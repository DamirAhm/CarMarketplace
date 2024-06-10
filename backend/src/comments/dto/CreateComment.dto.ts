import { ICreateComment } from '../../../../common/interfaces/comments/createComment.interface';
import { IsString } from 'class-validator';

export class CreateCommentDto implements ICreateComment {
  @IsString()
  text: string;

  @IsString()
  feedbackId: string;
}
