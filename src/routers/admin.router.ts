import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { AdminPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { secretKeyRateLimiter } from "../middlewares/rateLimit.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post(
  "/create-admin-user",
  secretKeyRateLimiter,
  authMiddleware.CheckSecretKey,
  userMiddleware.isBodyValid(UserValidator.createAdmin),
  authController.createAdmin,
);
router.post(
  "/change-role",
  authMiddleware.checkAccessToken(AdminPermissions.CHANGE_ROLE),
  userMiddleware.isBodyValid(UserValidator.changeRole),
  authController.changeRole,
);
router.put(
  "/update-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.UPDATE_USER),
  userMiddleware.isBodyValid(UserValidator.updateAdmin),
  userController.updateForAdmin,
);

router.get(
  "/get-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.GET_USER),
  userController.getForAdmin,
);
router.delete(
  "/remove-user/:userId",
  authMiddleware.checkAccessToken(AdminPermissions.REMOVE_USER),
  userController.remove,
);

router.get(
  "/all",
  rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }),
  authMiddleware.checkAccessToken(AdminPermissions.VIEW_ALL_USERS),
  userController.getList,
);

router.get(
  "/user-list",
  authMiddleware.checkAccessToken(AdminPermissions.VIEW_USER_LIST),
  userMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getListWithQueryParams,
);

export const adminRouter = router;
