import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarBrandEnum } from "../enums/car-brand.enum";
import { CarListOrderByEnum } from "../enums/car-list-order-by.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { OrderEnum } from "../enums/order.enum";
import { ICurrencyResponse } from "./сurrency.interface";

export interface ICar {
  _id?: string;
  brand: CarBrandEnum;
  model: string;
  year: number;
  vin?: string;
  fuelType?: CarFuelTypeEnum;
  type?: CarTypeEnum;
  engineCapacity?: number;
  stateNumber?: string;
  distance?: number;
  defaultPrice: number;
  defaultCurrency: CurrencyEnum;
  allPrice?: ICurrencyResponse[];
  new: boolean;
  image?: string[];
  advertType: AdvertTypeEnum;
  regionID: number;
  city: string;
  ownerId?: string;
  companyId?: string;
  isCarSold: boolean;
  isActive: boolean;
  views?: {
    total: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICarListQuery {
  limit?: number;
  page?: number;
  brand?: CarBrandEnum;
  year?: number;
  fuelType?: CarFuelTypeEnum;
  type?: CarTypeEnum;
  advertType?: AdvertTypeEnum;
  regionID?: number;
  new?: boolean;
  order?: OrderEnum;
  orderBy?: CarListOrderByEnum;
}

export type ICarResponse = Pick<
  ICar,
  | "_id"
  | "brand"
  | "model"
  | "year"
  | "fuelType"
  | "type"
  | "engineCapacity"
  | "stateNumber"
  | "distance"
  | "defaultPrice"
  | "defaultCurrency"
  | "allPrice"
  | "new"
  | "image"
  | "regionID"
  | "city"
  | "createdAt"
>;
