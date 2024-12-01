import { Router } from "express";

import { reportController } from "../controllers/report.controller";
import { UserPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();
router.get(
  "/:carId/stats",
  authMiddleware.checkAccessToken(UserPermissions.REPORT),
  userMiddleware.checkPremium,
  carMiddleware.checkCarIdAndOwner(),
  reportController.getStats,
);
router.get(
  "/average-price/region/:regionId",
  authMiddleware.checkAccessToken(UserPermissions.REPORT),
  userMiddleware.checkPremium,
  reportController.getAveragePriceByRegion,
);
router.get(
  "/average-price/national",
  authMiddleware.checkAccessToken(UserPermissions.REPORT),
  userMiddleware.checkPremium,
  reportController.getAveragePriceAllUkraine,
);

export const reportsRouter = router;
