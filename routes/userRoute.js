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
    chekAdminRole,
    chekAuthorRole
} from "../middlewares/authMiddleware.js";

userRouter.post("/create", createUserValidate(createUserSchema), authenticate, chekAdminRole, createUser);
userRouter.get("/all", authenticate, chekAdminRole, getAllUsers);
userRouter.get("/:id", idValidate(idSchema), authenticate, chekAuthorRole, chekAdminRole, getUserById);
userRouter.patch("/:id", idValidate(idSchema), updateUserValidate(updateUserSchema), authenticate, chekAuthorRole, chekAdminRole, updateUser);
userRouter.delete("/:id", idValidate(idSchema), authenticate, chekAdminRole, deleteUser);

export default userRouter;