import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";

import { imgCarConfigs } from "../config/file-configs";
import { AccountTypeEnum } from "../enums/account-type.enum";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api.error";
import { currencyHelper } from "../helpers/currency.helper";
import { ICar, ICarListQuery, ICarResponse } from "../interfaces/car.interface";
import { IPaginatorResponse } from "../interfaces/paginator.interface";
import { IUser } from "../interfaces/user.interface";
import { carPresenter } from "../presenters/car.presenter";
import { carRepository } from "../repositories/car.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

export class CarService {
  public async getListWithQueryParams(
    query: ICarListQuery,
  ): Promise<IPaginatorResponse<ICarResponse>> {
    const [cars, total] = await carRepository.getListWithQueryParams(query);
    const rates = await currencyHelper.readFallbackRates();
    const entities = await Promise.all(
      cars.map(async (car) => {
        car.allPrice = await currencyHelper.convert(
          car.defaultPrice,
          car.defaultCurrency,
          rates,
        );
        return car;
      }),
    );

    return carPresenter.toListResDto(entities, total, query);
  }

  public async getUser(userId: string): Promise<IUser> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError("Invalid user ID format", 400);
    }
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User with this id not found", 404);
    }
    return user;
  }
  public async create(dto: ICar): Promise<ICar> {
    const advertDouble = await carRepository.getByVinAndStatus(dto.vin, true);
    if (advertDouble) {
      throw new ApiError(
        "Active advert with this VIN code already exists",
        400,
      );
    }
    const user = await userRepository.getById(dto.ownerId);
    const countActiveAdvert = await carRepository.getCountActiveAdvert(
      dto.ownerId,
      true,
    );
    if (user.accountType == AccountTypeEnum.BASIC && countActiveAdvert >= 1) {
      throw new ApiError(
        "User with a basic account can create only 1 advert",
        402,
      );
    }
    const rates = await currencyHelper.readFallbackRates();
    dto.allPrice = await currencyHelper.convert(
      dto.defaultPrice,
      dto.defaultCurrency,
      rates,
    );
    return await carRepository.create(dto);
  }
  public async getCar(carId: string): Promise<ICar> {
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new ApiError("Invalid car ID format", 400);
    }

    const car = await carRepository.getById(carId);
    if (!car) {
      throw new ApiError("Car with this id not found", 404);
    }
    return car;
  }

  public async getCarWithPrice(carId: string): Promise<ICar> {
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new ApiError("Invalid car ID format", 400);
    }

    const car = await carRepository.getById(carId);
    if (!car) {
      throw new ApiError("Car with this id not found", 404);
    }
    const rates = await currencyHelper.readFallbackRates();
    car.allPrice = await currencyHelper.convert(
      car.defaultPrice,
      car.defaultCurrency,
      rates,
    );
    return car;
  }

  public async getCarByUserId(userId: string): Promise<ICar[]> {
    const cars = await carRepository.getCarByUserId(userId);
    if (!cars) {
      throw new ApiError("Cars not found", 404);
    }
    return cars;
  }

  public async getCarByUserIdWithPrice(userId: string): Promise<ICar[]> {
    const cars = await carRepository.getCarByUserId(userId);

    if (!cars || cars.length === 0) {
      throw new ApiError("Cars not found", 404);
    }
    const rates = await currencyHelper.readFallbackRates();
    const carsWithPrice = await Promise.all(
      cars.map(async (car) => {
        car.allPrice = await currencyHelper.convert(
          car.defaultPrice,
          car.defaultCurrency,
          rates,
        );
        return car;
      }),
    );
    return carsWithPrice;
  }

  public async update(
    updateData: Partial<ICar>,
    carId: string,
  ): Promise<{ message: string }> {
    if (!updateData) {
      throw new ApiError("body is required", 400);
    }
    return await carRepository.update(carId, updateData);
  }

  public async remove(carId: string): Promise<{ message: string }> {
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new ApiError("Invalid car ID format", 400);
    }
    const car = await carRepository.getById(carId);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }
    return await carRepository.remove(carId);
  }

  public async uploadImg(
    carId: string,
    file: UploadedFile,
  ): Promise<{ message: string }> {
    const car = await carRepository.getById(carId);
    if (!car) {
      throw new Error(`Car with id ${carId} not found`);
    }
    const img = await s3Service.uploadFile(file, FileItemTypeEnum.CAR, carId);
    if (car.image.length >= imgCarConfigs.MAX_COUNT) {
      throw new ApiError(
        `Maximum count image exceeded, Max ${imgCarConfigs.MAX_COUNT} `,
        400,
      );
    }
    car.image.push(img);
    await carRepository.update(carId, { image: car.image });
    return { message: `Image uploaded successfully for car with id ${carId}` };
  }

  public async removeImg(
    imgPath: string,
    carId: string,
  ): Promise<{ message: string }> {
    await s3Service.deleteFile(imgPath);
    const car = await carRepository.getById(carId);
    const index = car.image.indexOf(imgPath);
    if (index !== -1) {
      car.image.splice(index, 1);
    }
    await carRepository.update(carId, { image: car.image });
    return { message: "Image delete successfully" };
  }
}
export const carService = new CarService();
