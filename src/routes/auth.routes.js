import express from "express";
import authController from "../controllers/auth.controller.js"; 

const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);

export default router;