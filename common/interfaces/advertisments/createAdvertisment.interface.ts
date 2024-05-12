import {Bodies, Brands, EngineTypes, Transmissions} from "../../constants/CarFeatures";

export enum Currencies {
    EUR = 'EUR',
    RUN = 'RUB',
    DOL = 'USD'
}

export interface CreateAdvertismentInterface {
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

}