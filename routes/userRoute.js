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

userRouter.post("/create", createUserValidate(createUserSchema), authenticate, checkRole(["admin"]), createUser);
userRouter.get("/all", authenticate, checkRole(["admin"]), getAllUsers);
userRouter.get("/:id", idValidate(idSchema), authenticate, checkRole(["author", "admin"]), getUserById);
userRouter.patch("/:id", idValidate(idSchema), updateUserValidate(updateUserSchema), authenticate, checkRole(["author","admin"]), updateUser);
userRouter.delete("/:id", idValidate(idSchema), authenticate, checkRole(["admin"]), deleteUser);

export default userRouter;