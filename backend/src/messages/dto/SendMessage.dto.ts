import { ISendMessage } from '../../../../common/interfaces/messages/SendMessage.interface';
import { IsString } from 'class-validator';

export class SendMessageDto implements ISendMessage {
  @IsString()
  readonly message: string;

  @IsString()
  readonly to: string;
}
