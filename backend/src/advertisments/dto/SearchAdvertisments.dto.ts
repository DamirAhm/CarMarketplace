import { ISearchAdvertisments } from '../../../../common/interfaces/advertisments/searchAdvertisments.interface';
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
import { Currencies } from '../../../../common/interfaces/advertisments/createAdvertisment.interface';

export class SearchAdvertismentsDto implements ISearchAdvertisments {
  @IsOptional()
  @IsEnum(Bodies)
  readonly body?: (typeof Bodies)[number];

  @IsOptional()
  @IsEnum(Brands)
  readonly brand?: (typeof Brands)[number];

  @IsOptional()
  @IsEnum(EngineTypes)
  readonly engineType?: (typeof EngineTypes)[number];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly cost?: number;

  @IsOptional()
  @IsEnum(Currencies)
  readonly currency?: Currencies;

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
  readonly model?: string;

  @IsOptional()
  @IsEnum(Transmissions)
  readonly transmission?: (typeof Transmissions)[number];

  @IsOptional()
  @IsInt()
  readonly year?: number;

  @IsOptional()
  @IsString()
  readonly imageId?: string;

  @IsOptional()
  @IsInt()
  readonly yearTo?: number;

  @IsOptional()
  @IsInt()
  readonly engineVolumeTo?: number;

  @IsOptional()
  @IsInt()
  readonly mileageTo?: number;

  @IsOptional()
  @IsInt()
  readonly costTo?: number;
}
