import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ICar, ICarListQuery } from "../interfaces/car.interface";
import { carPresenter } from "../presenters/car.presenter";
import { carService } from "../services/car.service";
import { reportService } from "../services/report.service";

class CarController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ICar;
      dto.ownerId = req.res.locals.jwtPayload.userId;
      const result = await carService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ICar;
      const carId = req.params.carId;
      await carService.getCar(carId);
      const result = await carService.update(dto, carId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getListWithQueryParams(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = req.query as unknown as ICarListQuery;
      const cars = await carService.getListWithQueryParams(query);
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      const car = await carService.getCarWithPrice(carId);
      await reportService.incrementViews(carId);
      const resault = await carPresenter.toPublicResDto(car);
      res.status(200).json(resault);
    } catch (e) {
      next(e);
    }
  }
  public async getMyCars(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId;
      const cars = await carService.getCarByUserIdWithPrice(userId);
      const resault = await carPresenter.toMyCarsDto(cars);
      res.status(200).json(resault);
    } catch (e) {
      next(e);
    }
  }
  public async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      await carService.getCar(carId);
      const result = await carService.update({ isActive: false }, carId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async carSold(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      await carService.getCar(carId);
      const result = await carService.update(
        { isCarSold: true, isActive: false },
        carId,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      const result = await carService.remove(carId);
      return res.status(200).json({ message: result.message, status: 200 });
    } catch (e) {
      next(e);
    }
  }
  public async uploadImg(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      const img = req.files.img as UploadedFile;
      await carService.uploadImg(carId, img);
      const car = await carService.getCarWithPrice(carId);
      const resault = await carPresenter.toPublicResDto(car);
      res.status(200).json(resault);
    } catch (e) {
      next(e);
    }
  }

  public async removeImg(req: Request, res: Response, next: NextFunction) {
    try {
      const imgPath = req.params.imgPath;
      const carId = imgPath.split("/")[1];
      const resault = await carService.removeImg(imgPath, carId);
      res.status(200).json(resault);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
