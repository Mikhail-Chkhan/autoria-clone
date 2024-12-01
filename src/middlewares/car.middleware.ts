import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { ApiError } from "../errors/api.error";
import { carService } from "../services/car.service";

class CarMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        if (e instanceof ValidationError) {
          const errorMessage = e.details.map((err) => err.message).join(", ");
          next(new ApiError(errorMessage, 400));
        } else {
          next(e);
        }
      }
    };
  }

  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
  public checkCarIdAndOwner() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const car = await carService.getCar(req.params.carId);
        const userId = req.res.locals.jwtPayload.userId;
        if (car.ownerId != userId) {
          throw new ApiError("Access denied", 403);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public checkImgPathAndOwner() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imgPath = req.params.imgPath;
        const userId = res.locals.jwtPayload.userId;
        if (!imgPath) {
          throw new ApiError("Invalid image path", 400);
        }
        const carId = imgPath.split("/")[1];
        if (!carId) {
          throw new ApiError("Car ID not found in image path", 400);
        }
        const car = await carService.getCar(carId);
        if (car.ownerId !== userId) {
          throw new ApiError(
            "Access denied. You are not the owner of this car",
            403,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const carMiddleware = new CarMiddleware();
