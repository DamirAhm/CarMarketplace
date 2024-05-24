import { ICreateReaction } from '../../../../common/interfaces/feedback/createReaction.interface';
import { IsEnum, IsString } from 'class-validator';
import { Opinion } from '../../../../common/types/Opinion';

export class CreateReactionDto implements ICreateReaction {
  @IsEnum(Opinion)
  readonly opinion: Opinion;

  @IsString()
  readonly feedbackId: string;
}
