import {Bodies, Brands, EngineTypes, Transmissions} from "../../constants/CarFeatures";

export enum Currencies {
    EUR = 'EUR',
    RUB = 'RUB',
    DOL = 'USD'
}

export interface ICreateAdvertisment {
    cost: number;
    currency: Currencies,
    brand: (typeof Brands)[number];
    model: string;
    year: number;
    mileage?: number
    engineType?: (typeof EngineTypes)[number];
    engineVolume?: number;
    transmission?: (typeof Transmissions)[number];
    body?: (typeof Bodies)[number];
    description?: string;
    generation?: string;
    imageId?: string;
}