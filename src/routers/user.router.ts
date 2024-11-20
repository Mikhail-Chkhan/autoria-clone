import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/sign-up",
  // userMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);
router.post(
  "/sign-in",
  // userMiddleware.isBodyValid(UserValidator.signIn),
  authController.signIn,
);
// router.post(
//     "/refresh",
//     authMiddleware.checkRefreshToken,
//     authController.refresh,
// );
// router.post(
//     "/change-password",
//     userMiddleware.isBodyValid(UserValidator.changePassword),
//     authMiddleware.checkAccessToken,
//     authController.changePassword,
// );
// router.post(
//     "/reset-password",
//     userMiddleware.isBodyValid(UserValidator.resetPassword),
//     userMiddleware.checkUserByEmail,
//     authController.resetPassword,
// );
// router.put(
//     "/reset-password",
//     userMiddleware.isBodyValid(UserValidator.setPassword),
//     authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
//     authController.forgotPasswordSet,
// );
// router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
// router.post(
//     "/logout/all",
//     authMiddleware.checkAccessToken,
//     authController.logoutAll,
// );
// router.get(
//     "/verification-request",
//     authMiddleware.checkAccessToken,
//     authController.verificationRequest,
// );
// router.post(
//     "/verify",
//     userMiddleware.isBodyValid(UserValidator.verify),
//     authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
//     authController.verify,
// );
export const userRouter = router;
