import { Router } from "express";
const userRoleRouter = Router();

import { authenticate, checkPermission } from "../middlewares/authMiddleware.js";
import {
    createUserRole,
    getAllRolesOfUser,
    getUserRoleById,
    updateUserRole,
    deleteUserRole
} from "../controllers/userRoleController.js";
import {idValidate} from "../middlewares/abstractMiddleware.js";
import {idSchema} from "../middlewares/schemas.js";

userRoleRouter.post("/create", authenticate, checkPermission(["createUserRole"]), createUserRole);
userRoleRouter.get("/all", authenticate, checkPermission(["viewAnyUserRole"]), getAllRolesOfUser);
userRoleRouter.get("/:id", authenticate, checkPermission(["viewUserRole"]), idValidate(idSchema), getUserRoleById);
userRoleRouter.patch("/:id", authenticate, checkPermission(["updateUserRole"]), idValidate(idSchema), updateUserRole);
userRoleRouter.delete("/:id", authenticate, checkPermission(["deleteUserRole"]), idValidate(idSchema), deleteUserRole);


export default userRoleRouter;