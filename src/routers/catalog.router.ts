import { Router } from "express";

import { catalogController } from "../controllers/catalog.controller";

const router = Router();
router.get("/region", catalogController.getRegion);
router.get("/brand", catalogController.getCarBrand);

export const catalogRouter = router;
