import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/send-verify-code",
  userMiddleware.isQueryValid(UserValidator.checkEmail),
  authController.sendVerifyCode,
);
router.post(
  "/sign-up",
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
  authMiddleware.checkAccessToken,
  authController.changePassword,
);
router.post(
  "/reset-password",
  userMiddleware.isBodyValid(UserValidator.checkEmail),
  userMiddleware.checkUserByEmail,
  authController.resetPassword,
);
router.put(
  "/reset-password",
  userMiddleware.isBodyValid(UserValidator.setPassword),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);
router.get(
  "/verification-request",
  authMiddleware.checkAccessToken,
  authController.verificationRequest,
);
router.post(
  "/verify",
  userMiddleware.isBodyValid(UserValidator.verify),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  authController.verify,
);

export const authRouter = router;