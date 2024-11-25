import { model, Schema } from "mongoose";

import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";
import { ICar } from "../interfaces/car.interface";

const carSchema = new Schema(
  {
    brandId: { type: Number, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: false },
    fuelType: { type: String, enum: CarFuelTypeEnum },
    type: { type: String, enum: CarTypeEnum },
    engineCapacity: { type: Number },
    distance: { type: Number },
    new: { type: Boolean, required: true },
    image: { type: [String], default: [] },
    advertType: {
      type: String,
      required: true,
      enum: AdvertTypeEnum,
      default: AdvertTypeEnum.PRIVAT,
    },
    regionID: { type: Number, required: true },
    city: { type: String, required: true },
    ownerId: { type: String, required: false },
    companyId: { type: String, required: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("cars", carSchema);
