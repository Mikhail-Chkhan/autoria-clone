import { FilterQuery, SortOrder } from "mongoose";

import { CarListOrderByEnum } from "../enums/car-list-order-by.enum";
import { ApiError } from "../errors/api.error";
import { ICar, ICarListQuery } from "../interfaces/car.interface";
import { Car } from "../models/car.model";

class CarRepository {
  public async create(car: ICar): Promise<ICar> {
    return await Car.create(car);
  }

  public async getById(carId: string): Promise<ICar | null> {
    return await Car.findById(carId);
  }

  public async update(
    carId: string,
    dataCar: Partial<ICar>,
  ): Promise<{ message: string }> {
    await Car.findByIdAndUpdate(carId, dataCar);
    return { message: `Car with id ${carId} updated successfully` };
  }

  public async getByVinAndStatus(
    vin: string,
    isActive: boolean,
  ): Promise<ICar | null> {
    return await Car.findOne({ vin, isActive });
  }

  public async getCarByUserId(ownerId: string): Promise<ICar[] | []> {
    return await Car.find({ ownerId: ownerId });
  }

  public async getCountActiveAdvert(
    ownerId: string,
    isActive: boolean,
  ): Promise<number> {
    return await Car.countDocuments({ ownerId, isActive });
  }

  public async getListWithQueryParams(
    query: ICarListQuery,
  ): Promise<[ICar[], number]> {
    const filterObj: FilterQuery<ICar> = {};
    const sortObj: { [key: string]: SortOrder } = {};

    if (query.brand) {
      filterObj.brandId = query.brand;
    }
    if (query.year) {
      filterObj.year = query.year;
    }
    if (query.fuelType) {
      filterObj.fuelType = query.fuelType;
    }
    if (query.type) {
      filterObj.type = query.type;
    }
    if (query.advertType) {
      filterObj.advertType = query.advertType;
    }
    if (query.regionID) {
      filterObj.regionID = query.regionID;
    }
    if (typeof query.new === "boolean") {
      filterObj.new = query.new;
    }

    switch (query.orderBy) {
      case CarListOrderByEnum.YEAR:
        sortObj.year = query.order;
        break;
      case CarListOrderByEnum.REGION:
        sortObj.regionID = query.order;
        break;
      case CarListOrderByEnum.CREATED:
        sortObj.createdAt = query.order;
        break;
      case CarListOrderByEnum.DISTANCE:
        sortObj.distance = query.order;
        break;
      default:
        if (query.orderBy) {
          throw new ApiError("Invalid orderBy", 400);
        }
    }

    const limit = query.limit;
    const page = query.page;
    const skip = limit * (page - 1);

    const carsPromise = Car.find(filterObj)
      .sort(sortObj)
      .limit(limit)
      .skip(skip);

    const countPromise = Car.countDocuments(filterObj);
    const [cars, count] = await Promise.all([carsPromise, countPromise]);
    return [cars, count];
  }

  public async remove(carId: string): Promise<{ message: string }> {
    await Car.deleteOne({ _id: carId });
    return { message: `Car with id ${carId} removed successfully` };
  }

  public async getAveragePriceByRegion(
    regionID: number,
  ): Promise<Record<string, number>> {
    const result = await Car.aggregate([
      { $match: { regionID, isActive: true, isCarSold: false } },
      { $unwind: "$allPrice" },
      {
        $group: {
          _id: "$allPrice.ccy",
          averagePrice: { $avg: "$allPrice.price" },
        },
      },
    ]);
    const averagePrices: Record<string, number> = {};
    result.forEach((item) => {
      averagePrices[item._id] = item.averagePrice;
    });
    return averagePrices;
  }

  public async getAveragePriceAllUkraine(): Promise<Record<string, number>> {
    const result = await Car.aggregate([
      { $match: { isActive: true, isCarSold: false } },
      { $unwind: "$allPrice" },
      {
        $group: {
          _id: "$allPrice.ccy",
          averagePrice: { $avg: "$allPrice.price" },
        },
      },
    ]);
    const averagePrices: Record<string, number> = {};
    result.forEach((item) => {
      averagePrices[item._id] = item.averagePrice;
    });
    return averagePrices;
  }
}

export const carRepository = new CarRepository();
