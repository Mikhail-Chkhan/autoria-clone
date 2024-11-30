import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { carController } from "../controllers/car.controller";
import { userController } from "../controllers/user.controller";
import { AccountTypeEnum } from "../enums/account-type.enum";
import { AdminPermissions, CarPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { secretKeyRateLimiter } from "../middlewares/rateLimit.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { CarValidator } from "../validators/car.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get(
  "/get-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.GET_USER),
  userController.getForAdmin,
);
router.get(
  "/user-list",
  authMiddleware.checkAccessToken(AdminPermissions.VIEW_USER_LIST),
  userMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getListWithQueryParams,
);
router.post(
  "/create-admin-user",
  secretKeyRateLimiter,
  authMiddleware.CheckSecretKey,
  userMiddleware.isBodyValid(UserValidator.createAdmin),
  authController.createAdmin,
);
router.put(
  "/user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.UPDATE_USER),
  userMiddleware.isBodyValid(UserValidator.updateAdmin),
  userController.updateForAdmin,
);
router.patch(
  "/change-acc-type-premium/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.UPDATE_USER),
  userController.changeAccType(AccountTypeEnum.PREMIUM),
);
router.patch(
  "/change-acc-type-basic/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.UPDATE_USER),
  userController.changeAccType(AccountTypeEnum.BASIC),
);
router.delete(
  "/remove-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.REMOVE_USER),
  userController.remove,
);
router.post(
  "/change-role",
  authMiddleware.checkAccessToken(AdminPermissions.CHANGE_ROLE),
  userMiddleware.isBodyValid(UserValidator.changeRole),
  authController.changeRole,
);
router.patch(
  "/blocked-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.BLOCKED_USER),
  authController.deactivate,
);
router.patch(
  "/car/:carId",
  authMiddleware.checkAccessToken(CarPermissions.ADMIN_UPDATE_CAR),
  carMiddleware.isBodyValid(CarValidator.updateForAdmin),
  carController.update,
);
router.delete(
  "/car/:carId",
  authMiddleware.checkAccessToken(CarPermissions.DELETE_CAR),
  carController.delete,
);
router.post(
  "/upload-car-img/:carId",
  authMiddleware.checkAccessToken(CarPermissions.ADMIN_UPDATE_CAR),

  fileMiddleware.isImgCarValid,
  carController.uploadImg,
);
router.delete(
  "/remove-car-img/:imgPath(*)",
  authMiddleware.checkAccessToken(CarPermissions.ADMIN_UPDATE_CAR),
  carController.removeImg,
);

export const adminRouter = router;
