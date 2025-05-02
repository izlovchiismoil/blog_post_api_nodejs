import { Router } from "express";
const authRouter = Router();

import { loginUser, logoutUser, refreshToken } from "../controllers/authController.js";
import { authenticate, chekAdminRole, chekAuthorRole } from "../middlewares/authMiddleware.js";

authRouter.post("/login", loginUser);
authRouter.post("/logout", authenticate, chekAuthorRole, chekAdminRole, logoutUser);
authRouter.post("/refresh", authenticate, chekAuthorRole, chekAdminRole, refreshToken);

export default authRouter;

