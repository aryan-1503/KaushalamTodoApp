import { Router } from "express";
import "dotenv/config";
import { login, logout, register, verify, me, deleteUser } from "../controllers/auth.controller.js";
import { getUser } from "../middlewares/get-user.middleware.js";
import { validateAuthRequest } from "../middlewares/validation.middleware.js";
import { deleteUserSchema, loginSchema, registerSchema, verifySchema } from "../validators/user.validator.js";
const authRouter = Router();


// Request Handlers for Authentication along with validation validation
authRouter
    .post("/register", validateAuthRequest(registerSchema), register)
    .post("/login", validateAuthRequest(loginSchema), login)
    .post("/logout", logout)
    .get("/me", getUser, me)
    .post("/verify", validateAuthRequest(verifySchema), verify)
    .delete("/delete-user/:id", deleteUser)

export { authRouter };
