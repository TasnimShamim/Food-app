import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// ================= USER AUTH =================

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// ================= FOOD PARTNER AUTH APIs =================

router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPartner);

export default router;