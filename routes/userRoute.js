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
import { uploadProfile } from "../middlewares/uploadMiddleware.js";

userRouter.post("/create", authenticate, checkRole(["admin"]), uploadProfile.single("profileImage"), createUserValidate(createUserSchema), createUser);
userRouter.get("/all", authenticate, checkRole(["admin"]), getAllUsers);
userRouter.get("/:id", authenticate, checkRole(["author", "admin"]), idValidate(idSchema), getUserById);
userRouter.patch("/:id", authenticate, checkRole(["author","admin"]), uploadProfile.single("profileImage"), updateUser);
userRouter.delete("/:id", authenticate, checkRole(["admin"]), idValidate(idSchema), deleteUser);

export default userRouter;