import joi from "joi";

import { AdvertTypeEnum } from "../enums/advertType.enum";
import { CarBrandEnum } from "../enums/car-brand.enum";
import { CarListOrderByEnum } from "../enums/car-list-order-by.enum";
import { CarFuelTypeEnum } from "../enums/carFuelType.enum";
import { CarTypeEnum } from "../enums/carType.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { OrderEnum } from "../enums/order.enum";

export class CarValidator {
  private static brand = joi.string().valid(...Object.values(CarBrandEnum));
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
  private static isCarSold = joi.boolean();
  private static defaultPrice = joi.number();
  private static defaultCurrency = joi
    .string()
    .valid(...Object.values(CurrencyEnum));

  public static create = joi.object({
    brand: this.brand.required(),
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
    defaultPrice: this.defaultPrice.required(),
    defaultCurrency: this.defaultCurrency.required(),
  });
  public static update = joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
    vin: this.vin,
    fuelType: this.fuelType,
    type: this.type,
    engineCapacity: this.engineCapacity,
    stateNumber: this.stateNumber,
    distance: this.distance,
    new: this.new,
    image: this.image,
    regionID: this.regionID,
    city: this.city,
    defaultPrice: this.defaultPrice,
    defaultCurrency: this.defaultCurrency,
  });
  public static updateForAdmin = joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
    vin: this.vin,
    fuelType: this.fuelType,
    type: this.type,
    engineCapacity: this.engineCapacity,
    stateNumber: this.stateNumber,
    distance: this.distance,
    new: this.new,
    image: this.image,
    regionID: this.regionID,
    city: this.city,
    isActive: this.isActive,
    isCarSold: this.isCarSold,
    defaultPrice: this.defaultPrice,
    defaultCurrency: this.defaultCurrency,
  });

  public static listQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
    brand: joi.string().valid(...Object.values(CarBrandEnum)),
    year: joi.number().integer().min(1900).max(2024),
    fuelType: joi.string().valid(...Object.values(CarFuelTypeEnum)),
    type: joi.string().valid(...Object.values(CarTypeEnum)),
    advertType: joi.string().valid(...Object.values(AdvertTypeEnum)),
    regionID: joi.number().integer().min(1).max(26),
    new: joi.boolean(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(CarListOrderByEnum))
      .default(CarListOrderByEnum.CREATED),
  });
}

export const carValidator = new CarValidator();
