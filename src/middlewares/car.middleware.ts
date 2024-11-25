import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { ApiError } from "../errors/api.error";

class CarMiddleware {
  public checkId(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body); // проверяем и обновляем модифицированные данные
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
}

export const carMiddleware = new CarMiddleware();
