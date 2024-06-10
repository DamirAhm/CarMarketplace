import { Bodies, Brands, EngineTypes, Transmissions } from "../../constants/CarFeatures";
import { Currencies } from "./createAdvertisment.interface";

export interface IEditAdvertisment {
  cost: number;
  currency: Currencies,
  brand: (typeof Brands)[number];
  model: string;
  year: number;
  mileage?: number
  engineType: (typeof EngineTypes)[number];
  engineVolume?: number;
  transmission: (typeof Transmissions)[number];
  body?: (typeof Bodies)[number];
  description?: string;
  generation?: string;
  imageIds?: string[];
}