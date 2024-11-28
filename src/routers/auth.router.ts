import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { UserPermissions } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/send-verify-code",
  userMiddleware.isBodyValid(UserValidator.checkEmail),
  authController.sendVerifyCode,
);
router.post(
  "/verify-code",
  userMiddleware.isBodyValid(UserValidator.VerifyCode),
  authController.VerifyCode,
);
router.post(
  "/sign-up",
  userMiddleware.checkVerifyCode,
  userMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);
router.post(
  "/sign-in",
  userMiddleware.isBodyValid(UserValidator.signIn),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post(
  "/change-password",
  userMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken(UserPermissions.CHANGE_PASSWORD),
  authController.changePassword,
);
router.post(
  "/reset-password",
  userMiddleware.isBodyValid(UserValidator.checkEmail),
  userMiddleware.checkUserByEmail,
  authController.resetPassword,
);
router.put(
  "/set-password",
  userMiddleware.isBodyValid(UserValidator.setPassword),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);
router.post(
  "/logout",
  authMiddleware.checkAccessToken(UserPermissions.LOGOUT),
  authController.logout,
);
router.post(
  "/logout/all",
  authMiddleware.checkAccessToken(UserPermissions.LOGOUT),
  authController.logoutAll,
);
router.get(
  "/update-role-template",
  authMiddleware.checkAccessToken(UserPermissions.UPDATE_ROLE_TEMPLATE),
  authController.updateRoleTemplate,
);
export const authRouter = router;
