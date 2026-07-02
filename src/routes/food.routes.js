import express from "express";
import multer from "multer";

import foodController from "../controllers/food.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

/* POST /api/food/ [Protected] */
router.post(
    "/",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video "),
    foodController.createFood
);

/* GET /api/food [Protected] */
router.get(
    "/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
);

/* POST /api/food/like [Protected] */
router.post(
    "/like",
    authMiddleware.authUserMiddleware,
    foodController.likeFood
);

/* POST /api/food/save [Protected] */
router.post(
    "/save",
    authMiddleware.authUserMiddleware,
    foodController.saveFood
);

/* GET /api/food/save [Protected] */
router.get(
    "/save",
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
);

export default router;