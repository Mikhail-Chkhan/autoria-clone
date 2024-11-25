import { NextFunction, Request, Response } from "express";

import { ICar } from "../interfaces/car.interface";
import { carService } from "../services/car.service";

class CarController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ICar;
      const result = await carService.create(dto);
      res.status(201).json(result);
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
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async getMyCars(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async removeCar(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async getBrandList(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
