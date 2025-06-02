import { Router } from "express";
const authRouter = Router();

import { loginUser, logoutUser, refreshToken } from "../controllers/authController.js";
import { authenticate, checkRole } from "../middlewares/authMiddleware.js";

authRouter.post("/login", loginUser);
authRouter.post("/logout", authenticate, checkRole(["author","admin"]), logoutUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;

