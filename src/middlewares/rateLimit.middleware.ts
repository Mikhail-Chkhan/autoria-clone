import rateLimit from "express-rate-limit";

import { ApiError } from "../errors/api.error";

export const secretKeyRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  limit: 3, // 3 попытки
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError("Too many attempts, please try again later.", 400));
  },
});
