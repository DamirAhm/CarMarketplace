import {Advertisment, Car} from "@prisma/client";

export interface ISearchAdvertisments extends Partial<Pick<
    Advertisment & Car,
    'cost' |
    'brand' |
    'model' |
    'body' |
    'currency' |
    'engineType' |
    'engineVolume' |
    'transmission' |
    'mileage' |
    'year'
>> {
    yearTo?: number;
    engineVolumeTo?: number;
    mileageTo?: number;
    costTo?: number;
}