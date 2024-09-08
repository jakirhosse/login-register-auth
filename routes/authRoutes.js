import express from "express";
import { loginController } from "../controller/loginController.js";
import { registerController } from "../controller/registerController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
