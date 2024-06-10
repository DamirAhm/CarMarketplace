import { IsString } from 'class-validator';
import { IEditComment } from '../../../../common/interfaces/comments/editComment.interface';

export class EditCommentDto implements IEditComment {
  @IsString()
  text: string;
}
