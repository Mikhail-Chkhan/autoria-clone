import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();
router.get(
  "/",
  authMiddleware.checkAccessToken,
  // carMiddleware.isQueryValid(CarValidator.listQuery),
  carController.getListWithQueryParams,
);
router.post(
  "/create",
  // authMiddleware.checkAccessToken,
  carMiddleware.isBodyValid(CarValidator.create),
  carController.create,
);
router.put(
  "/update/:carId",
  authMiddleware.checkAccessToken,
  // carMiddleware.isBodyValid(CarrValidator.create),
  carController.update,
);
router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  // carMiddleware.isBodyValid(CarrValidator.create),
  carController.getById,
);
router.get(
  "/my",
  authMiddleware.checkAccessToken,
  // carMiddleware.isBodyValid(CarrValidator.create),
  carController.getMyCars,
);
router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  // carMiddleware.isBodyValid(CarrValidator.create),
  carController.removeCar,
);
router.patch(
  "/deactivate/:carId",
  authMiddleware.checkAccessToken,
  // carMiddleware.isBodyValid(CarrValidator.create),
  carController.deactivate,
);
router.get("/catalog-brand", carController.getBrandList);
export const carRouter = router;