import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
// router.use(rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 })); // at the level of the entire user.router
router.get(
  "/me",
  authMiddleware.checkAccessToken,
  userController.getPrivatById,
);
router.get("/:userId", userController.getPublicById);

router.patch(
  "/me",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.updateForPatch),
  userController.updateSelectParams,
);
router.post(
  "/logo",
  authMiddleware.checkAccessToken,
  fileMiddleware.isLogoValid,
  userController.uploadLogo,
);
router.delete(
  "/remove-logo",
  authMiddleware.checkAccessToken,
  userController.removeLogo,
);
router.post(
  "/change-email",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.changeEmail),
  userController.updateSelectParams,
  //todo не работает из-за проверки на уникальность при верификации. реализовать через экшенТокен, как ранее в верификации было
);
// router.delete("/remove", authMiddleware.checkAccessToken, userController.deactivated,);
//todo add deactivated user then update "isDeleted:true"
export const userRouter = router;
