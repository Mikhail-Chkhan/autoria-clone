import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { CarPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();
router.get(
  "/",
  carMiddleware.isQueryValid(CarValidator.listQuery),
  carController.getListWithQueryParams,
);
router.get(
  "/my",
  authMiddleware.checkAccessToken(CarPermissions.GET_CARS),
  carController.getMyCars,
);
router.get("/:carId", carController.getById);
router.post(
  "/create",
  authMiddleware.checkAccessToken(CarPermissions.CREATE_CAR),
  carMiddleware.isBodyValid(CarValidator.create),
  carController.create,
);
router.patch(
  "/:carId",
  authMiddleware.checkAccessToken(CarPermissions.UPDATE_CAR),
  carMiddleware.checkCarIdAndOwner,
  carMiddleware.isBodyValid(CarValidator.update),
  carController.update,
);
router.patch(
  "/sale/:carId",
  authMiddleware.checkAccessToken(CarPermissions.UPDATE_CAR),
  carMiddleware.checkCarIdAndOwner,
  carController.carSold,
);
router.patch(
  "/deactivate/:carId",
  authMiddleware.checkAccessToken(CarPermissions.DEACTIVATE_CAR),
  carMiddleware.checkCarIdAndOwner,
  carController.deactivate,
);
router.post(
  "/upload-img/:carId",
  authMiddleware.checkAccessToken(CarPermissions.UPDATE_CAR),
  carMiddleware.checkCarIdAndOwner(),
  fileMiddleware.isImgCarValid,
  carController.uploadImg,
);
router.delete(
  "/remove-img/:imgPath(*)",
  authMiddleware.checkAccessToken(CarPermissions.UPDATE_CAR),
  carMiddleware.checkImgPathAndOwner(),
  carController.removeImg,
);
export const carRouter = router;
