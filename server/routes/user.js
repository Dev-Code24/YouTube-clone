import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logOut);

export default router;
