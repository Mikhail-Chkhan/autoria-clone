import { NextFunction, Request, Response } from "express";

import { imgCarConfigs, logoConfigs } from "../config/file-configs";
import { ApiError } from "../errors/api.error";

class FileMiddleware {
  public isLogoValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files.logo)) {
        throw new ApiError("Logo must be single file", 400);
      }
      const { mimetype, size } = req.files.logo;
      if (!logoConfigs.MIMETYPE.includes(mimetype)) {
        throw new ApiError("The logo must be type png or jpeg", 400);
      }
      if (size > logoConfigs.MAX_SIZE) {
        throw new ApiError(`Max size logo ${logoConfigs.MAX_SIZE} `, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isImgCarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files.img)) {
        throw new ApiError("Image must be single file", 400);
      }
      const { mimetype, size } = req.files.img;
      if (!imgCarConfigs.MIMETYPE.includes(mimetype)) {
        throw new ApiError("The image must be type png or jpeg", 400);
      }
      if (size > imgCarConfigs.MAX_SIZE) {
        throw new ApiError(`Max size image ${imgCarConfigs.MAX_SIZE} `, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
