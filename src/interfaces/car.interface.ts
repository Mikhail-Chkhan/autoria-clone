import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";

export interface ICar {
  _id?: string;
  brandId: number;
  model: string;
  year: number;
  vin?: string;
  fuelType?: CarFuelTypeEnum;
  type?: CarTypeEnum;
  engineCapacity?: number;
  stateNumber?: string;
  distance?: number;
  new: boolean;
  image?: string[];
  advertType: AdvertTypeEnum;
  regionID: number;
  city: string;
  ownerId?: string;
  companyId?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
