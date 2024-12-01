import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { AccountTypeEnum } from "../enums/account-type.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { verifyCodeRepository } from "../repositories/verify-code.repository";

class UserMiddleware {
  public async checkVerifyCode(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IUser;
      const email = dto.email;
      const verifyCode = dto.verifyCode;
      const actualVerifyCode = await verifyCodeRepository.findByParams({
        email,
      });
      if (!actualVerifyCode) {
        throw new ApiError("The user has not completed verification.", 400);
      }
      if (actualVerifyCode.verifyCode != verifyCode) {
        throw new ApiError("Verify code is incorrect", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

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

  public async checkUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req.body.email;
      const user: IUser = await userRepository.getByEmail(email);

      if (!user) {
        next(new ApiError("User not found", 404));
      }
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkPremium(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId;
      const user = await userRepository.getById(userId);
      if (user.accountType == AccountTypeEnum.BASIC) {
        throw new ApiError(
          "User with a basic account. Reports aren't available",
          402,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
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

export const userMiddleware = new UserMiddleware();
