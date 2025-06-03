import { Router } from "express";
const authRouter = Router();

import { loginUser, logoutUser, refreshToken } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

authRouter.post("/login", loginUser);
authRouter.post("/logout", authenticate, logoutUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;

