import { model, Schema } from "mongoose";

import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarBrandEnum } from "../enums/car-brand.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { ICar } from "../interfaces/car.interface";

const viewsSchema = new Schema({
  total: { type: Number, default: 0 },
  daily: { type: Number, default: 0 },
  weekly: { type: Number, default: 0 },
  monthly: { type: Number, default: 0 },
});

const allPriceSchema = new Schema({
  ccy: { type: String, enum: Object.values(CurrencyEnum), required: true },
  rate: { type: Number, required: true },
  price: { type: Number, required: true },
});

const carSchema = new Schema(
  {
    brand: { type: String, enum: Object.values(CarBrandEnum) },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: false },
    fuelType: { type: String, enum: Object.values(CarFuelTypeEnum) },
    type: { type: String, enum: Object.values(CarTypeEnum) },
    engineCapacity: { type: Number },
    distance: { type: Number },
    new: { type: Boolean, required: true },
    image: { type: [String], default: [] },
    advertType: {
      type: String,
      required: true,
      enum: Object.values(AdvertTypeEnum),
      default: AdvertTypeEnum.PRIVAT,
    },
    defaultPrice: { type: Number, required: true },
    defaultCurrency: { type: String, enum: Object.values(CurrencyEnum) },
    allPrice: { type: [allPriceSchema], default: [] },
    regionID: { type: Number, required: true },
    city: { type: String, required: true },
    ownerId: { type: String, required: false },
    companyId: { type: String, required: false },
    views: { type: viewsSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true },
    isCarSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("cars", carSchema);
