import {
  CreateAdvertismentInterface,
  Currencies,
} from '../../../../common/interfaces/advertisments/createAdvertisment.interface';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  Bodies,
  Brands,
  EngineTypes,
  Transmissions,
} from '../../../../common/constants/CarFeatures';

export class CreateAdvertismentDto implements CreateAdvertismentInterface {
  @IsOptional()
  @IsEnum(Bodies)
  readonly body?: (typeof Bodies)[number];

  @IsEnum(Brands)
  readonly brand: (typeof Brands)[number];

  @IsOptional()
  @IsEnum(EngineTypes)
  readonly engineType?: (typeof EngineTypes)[number];

  @IsNumber()
  @IsPositive()
  readonly cost: number;

  @IsEnum(Currencies)
  readonly currency: Currencies;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly engineVolume?: number;

  @IsOptional()
  @IsString()
  readonly generation?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly mileage?: number;

  @IsOptional()
  @IsString()
  readonly model: string;

  @IsOptional()
  @IsEnum(Transmissions)
  readonly transmission?: (typeof Transmissions)[number];

  @IsInt()
  readonly year: number;
}
