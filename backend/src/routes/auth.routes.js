import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";
import { registerValidator, loginValidator } from "../middleware/validators.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// /api/v1/auth/register   
router.route("/register").post(registerValidator, validate, registerUser)

// /api/v1/auth/login   
router.route("/login").post(loginValidator, validate, loginUser)

export default router;
