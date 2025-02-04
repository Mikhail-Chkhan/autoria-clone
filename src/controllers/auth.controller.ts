import { NextFunction, Request, Response } from "express";

import { TypeRegEnum } from "../enums/type-reg.enum";
import { TypeVerifyEnum } from "../enums/type-verify.enum";
import { IRoleChange } from "../interfaces/role.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interfaces/user.interface";
import { IVerifyCodePayload } from "../interfaces/verify-code.interface";
import { authService } from "../services/auth.service";
import { roleService } from "../services/role.service";

class AuthController {
  public async sendVerifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email as string;
      await authService.sendVerifyCode(email, TypeVerifyEnum.REGISTRATION);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async sendVerifyCodeForChangeEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req.body.email as string;
      await authService.sendVerifyCode(email, TypeVerifyEnum.CHANGE_EMAIL);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async VerifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IVerifyCodePayload;
      await authService.VerifyCode(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto, TypeRegEnum.USER);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto, TypeRegEnum.ADMIN);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const result = await authService.signIn(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.res.locals.refreshToken as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const result = await authService.refresh(token, jwtPayload);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async changePassword(req: Request, res: Response, next: NextFunction) {
    const { userId: userId } = req.res.locals.jwtPayload as ITokenPayload;
    try {
      const dto = req.body;
      const result = await authService.changePassword(dto, userId);
      return res.status(200).json({ message: result.message, status: 200 });
    } catch (e) {
      next(e);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      await authService.resetPassword(user);
      return res
        .status(200)
        .json({ message: "Password recovery email sent", status: 200 });
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IResetPasswordSet;

      await authService.forgotPasswordSet(dto, jwtPayload);
      return res
        .status(200)
        .json({ message: "password successfully recovered", status: 200 });
    } catch (e) {
      next(e);
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenId = req.res.locals.tokenId as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logout(jwtPayload, tokenId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await authService.logoutAll(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleChange = req.body as IRoleChange;
      const result = await authService.changeRole(roleChange);
      return res.status(200).json({ message: result.message, status: 200 });
    } catch (e) {
      next(e);
    }
  }

  public async updateRoleTemplate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await roleService.updateRole(
        jwtPayload.userId,
        jwtPayload.role,
      );
      return res.status(200).json({ message: result.message, status: 200 });
    } catch (e) {
      next(e);
    }
  }

  public async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await authService.deactivate(userId);
      return res.status(200).json({ message: result.message, status: 200 });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
