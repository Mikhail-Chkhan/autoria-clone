import { NextFunction, Request, Response } from "express";

import { authService } from "../servises/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      // const dto = req.body as IUser;
      const result = await authService.signUp();
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      // const dto = req.body as ISignIn;
      const result = await authService.signIn();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
