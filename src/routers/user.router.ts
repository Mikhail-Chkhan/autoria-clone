import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { UserPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get(
  "/me",
  authMiddleware.checkAccessToken(UserPermissions.VIEW_OWN_PROFILE),
  userController.getPrivatById,
);
router.get("/:userId", userController.getPublicById);

router.patch(
  "/me",
  authMiddleware.checkAccessToken(UserPermissions.UPDATE_OWN_PROFILE),
  userMiddleware.isBodyValid(UserValidator.updateForPatch),
  userController.updateSelectParams,
);
router.post(
  "/logo",
  authMiddleware.checkAccessToken(UserPermissions.UPLOAD_LOGO),
  fileMiddleware.isLogoValid,
  userController.uploadLogo,
);
router.delete(
  "/remove-logo",
  authMiddleware.checkAccessToken(UserPermissions.UPLOAD_LOGO),
  userController.removeLogo,
);
router.post(
  "/change-email-verify",
  authMiddleware.checkAccessToken(UserPermissions.CHANGE_EMAIL),
  userMiddleware.isBodyValid(UserValidator.checkEmail),
  authController.sendVerifyCodeForChangeEmail,
);
router.post(
  "/change-email",
  authMiddleware.checkAccessToken(UserPermissions.CHANGE_EMAIL),
  userMiddleware.isBodyValid(UserValidator.changeEmail),
  userController.updateSelectParams,
);

export const userRouter = router;
