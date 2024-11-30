import { NextFunction, Request, Response } from "express";

import { configs } from "../config/configs";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import {
  AdminPermissions,
  CarPermissions,
  UserPermissions,
} from "../enums/permissions.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkAccessToken(
    permission?: AdminPermissions | UserPermissions | CarPermissions,
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      {
        try {
          const header = req.headers.authorization;
          if (!header) {
            throw new ApiError("Token is not provided", 401);
          }
          const accessToken = header.split("Bearer ")[1];
          if (!accessToken) {
            throw new ApiError("Token format is invalid", 401);
          }
          const payload = tokenService.verifyToken(
            accessToken,
            TokenTypeEnum.ACCESS,
          );
          const pair = await tokenRepository.findByParams({ accessToken });
          if (!pair) {
            throw new ApiError("Token is not valid", 401);
          }
          if (!payload.permissions.includes(permission)) {
            throw new ApiError("You do not have the required permissions", 403);
          }
          req.res.locals.jwtPayload = payload;
          next();
        } catch (e) {
          next(e);
        }
      }
    };
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }
      const refreshToken = header.split("Bearer ")[1];
      const payload = tokenService.verifyToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkActionToken(type: ActionTokenTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.body.token as string;
        if (!token) {
          throw new ApiError("Token is not provided", 401);
        }
        const payload = tokenService.verifyToken(token, type);

        const tokenEntity = await actionTokenRepository.getByToken(token);
        if (!tokenEntity) {
          throw new ApiError("Token is not valid", 401);
        }
        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async CheckSecretKey(req: Request, res: Response, next: NextFunction) {
    try {
      const secretKey = req.body.secretKey;
      console.log(secretKey);
      if (!secretKey) {
        throw new ApiError("Secret Key is required", 400);
      }
      if (secretKey !== configs.JWT_SECRET_KEY) {
        throw new ApiError("Secret Key is incorrect", 400);
      }
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
