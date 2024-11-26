import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post(
  "/create-admin-user",
  // authController.CheckSecretKey,
  userMiddleware.isBodyValid(UserValidator.createAdmin),
  authController.createAdmin,
);
router.get(
  "/all",
  rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }),
  authMiddleware.checkAccessToken,
  userController.getList,
);
router.get(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getListWithQueryParams,
);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.checkId,
  userController.getPrivatById,
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.checkId,
  userController.update,
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.checkId,
  userController.remove,
);

export const adminRouter = router;
