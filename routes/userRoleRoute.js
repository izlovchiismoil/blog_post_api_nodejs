import { Router } from "express";
const userRoleRouter = Router();

import { authenticate, checkPermission } from "../middlewares/authMiddleware.js";
import {
    createUserRole,
    getAllUserRoles,
    getUserRoleById,
    updateUserRole,
    deleteUserRole
} from "../controllers/userRoleController.js";

userRoleRouter.post("/create", authenticate, checkPermission(["createUserRole"]), createUserRole);
userRoleRouter.get("/all", authenticate, checkPermission(["viewAnyUserRole"]), getAllUserRoles);
userRoleRouter.get("/:id", authenticate, checkPermission(["viewUserRole"]), getUserRoleById);
userRoleRouter.patch("/:id", authenticate, checkPermission(["updateUserRole"]), updateUserRole);
userRoleRouter.delete("/:id", authenticate, checkPermission(["deleteUserRole"]), deleteUserRole);

