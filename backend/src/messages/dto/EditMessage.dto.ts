import { IsString } from 'class-validator';
import { IEditMessage } from '../../../../common/interfaces/messages/EditMessage.interface';

export class EditMessageDto implements IEditMessage {
  @IsString()
  readonly message: string;
}
