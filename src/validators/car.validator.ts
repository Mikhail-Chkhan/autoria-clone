import joi from "joi";

import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";

export class CarValidator {
  private static brandId = joi.number().min(0).integer();
  private static model = joi.string().min(1).max(100).trim();
  private static year = joi.number().integer().min(1900).max(2025);
  private static vin = joi.string().uppercase().trim();
  private static fuelType = joi
    .string()
    .valid(...Object.values(CarFuelTypeEnum));
  private static type = joi.string().valid(...Object.values(CarTypeEnum));
  private static engineCapacity = joi.number().min(0).max(20);
  private static stateNumber = joi.string().uppercase().lowercase().trim();
  private static distance = joi.number().integer().min(0).max(9999999);
  private static new = joi.boolean().default(false);
  private static image = joi.array();
  private static advertType = joi
    .string()
    .valid(...Object.values(AdvertTypeEnum))
    .default(AdvertTypeEnum.PRIVAT);
  private static regionID = joi.number().min(0).integer();
  private static city = joi.string().trim();
  private static ownerId = joi.string().trim();
  private static companyId = joi.string().trim();
  private static isActive = joi.boolean();

  public static create = joi.object({
    brandId: this.brandId.required(),
    model: this.model.required(),
    year: this.year.required(),
    vin: this.vin.default(null),
    fuelType: this.fuelType.default(null),
    type: this.type.default(null),
    engineCapacity: this.engineCapacity.default(null),
    stateNumber: this.stateNumber.default(null),
    distance: this.distance.default(null),
    new: this.new.required(),
    image: this.image.default([]),
    advertType: this.advertType.required(),
    regionID: this.regionID.required(),
    city: this.city.required(),
    ownerId: this.ownerId.optional(),
    companyId: this.companyId.optional(),
    isActive: this.isActive.default(true),
  });
  // .xor("ownerId", "companyId");//для взаимосключения полей, пока не нужно

  // public static listQuery = joi.object({
  //   limit: joi.number().min(1).max(100).default(10),
  //   page: joi.number().min(1).default(1),
  //   search: joi.string().trim().lowercase(),
  //   order: joi
  //     .string()
  //     .valid(...Object.values(OrderEnum))
  //     .default(OrderEnum.ASC),
  //   orderBy: joi
  //     .string()
  //     .valid(...Object.values(UserListOrderByEnum))
  //     .default(UserListOrderByEnum.CREATED),
  // });
}

export const carValidator = new CarValidator();
