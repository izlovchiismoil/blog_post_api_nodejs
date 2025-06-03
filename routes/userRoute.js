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
    checkPermission,
} from "../middlewares/authMiddleware.js";
import { uploadProfile } from "../middlewares/uploadMiddleware.js";

userRouter.post("/create", authenticate, checkPermission(["createUser"]), uploadProfile.single("profileImage"), createUserValidate(createUserSchema), createUser);
userRouter.get("/all", authenticate, checkPermission(["viewAnyUser"]), getAllUsers);
userRouter.get("/:id", authenticate, checkPermission(["viewUser"]), idValidate(idSchema), getUserById);
userRouter.patch("/:id", authenticate, checkPermission(["updateUser"]), uploadProfile.single("profileImage"), updateUser);
userRouter.delete("/:id", authenticate, checkPermission(["deleteAnyUser"]), idValidate(idSchema), deleteUser);

export default userRouter;