import { Router  } from "express";
const userRouter = Router();
import {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
} from "../controllers/userController.js";
import {
    createUserSchema,
    idSchema,
    updateUserSchema,
} from "../middlewares/schemas.js";
import {
    createUserValidate,
    updateUserValidate,
} from "../middlewares/userMiddleware.js";
import { idValidate } from "../middlewares/abstractMiddleware.js";
import {
    authenticate,
    checkRole,
} from "../middlewares/authMiddleware.js";

userRouter.post("/create", authenticate, createUserValidate(createUserSchema), checkRole(["admin"]), createUser);
userRouter.get("/all", authenticate, checkRole(["admin"]), getAllUsers);
userRouter.get("/:id", authenticate, idValidate(idSchema), checkRole(["author", "admin"]), getUserById);
userRouter.patch("/:id", authenticate, idValidate(idSchema), updateUserValidate(updateUserSchema), checkRole(["author","admin"]), updateUser);
userRouter.delete("/:id", authenticate, idValidate(idSchema), checkRole(["admin"]), deleteUser);

export default userRouter;