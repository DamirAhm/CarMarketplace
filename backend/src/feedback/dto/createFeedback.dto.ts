import { ICreateFeedback } from '../../../../common/interfaces/feedback/createFeedback.interface';
import { IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto implements ICreateFeedback {
  @IsString()
  readonly carId: string;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly text: string;

  @IsString()
  readonly title: string;
}
