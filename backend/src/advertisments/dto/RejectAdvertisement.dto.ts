import { IRejectAdvertisementInterface } from '../../../../common/interfaces/advertisments/approve/rejectAdvertisement.interface';
import { IsString } from 'class-validator';

export class RejectAdvertisementDto implements IRejectAdvertisementInterface {
  @IsString()
  comment: string;
}
