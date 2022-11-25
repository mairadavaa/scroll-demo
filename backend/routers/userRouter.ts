import { Router } from "express";
import { userCtrl } from "../controllers/userCtrl";

export const userRouter = Router();

userRouter.post("/auth/login", userCtrl.login);
userRouter.post("/auth/logout", userCtrl.logout);
userRouter.post("/auth/register", userCtrl.createNewUser);
userRouter.post("/auth/forgot_password", userCtrl.forgotPassword);
userRouter.get("/auth/refresh_token", userCtrl.generateRefreshToken);
userRouter.get("/auth/email_verification", userCtrl.emailVerification);
userRouter.patch("/auth/reset_password/:token", userCtrl.resetPassword);
