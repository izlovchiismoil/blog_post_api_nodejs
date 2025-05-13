import { Router  } from "express";
const postRouter = Router();
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
    getPostsByCategoryId
} from "../controllers/postController.js";
import { idValidate } from "../middlewares/abstractMiddleware.js";
import {
    createPostValidate,
    updatePostValidate
} from "../middlewares/postMiddleware.js";
import {
    idSchema,
    createPostSchema,
    updatePostSchema
} from "../middlewares/schemas.js";
import {
    authenticate,
    checkRole,
} from "../middlewares/authMiddleware.js";

postRouter.post("/create", createPostValidate(createPostSchema), authenticate, checkRole(["author", "admin"]), createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/category/:id", getPostsByCategoryId);
postRouter.get("/:id", idValidate(idSchema), getPostById);
postRouter.patch("/:id", idValidate(idSchema), updatePostValidate(updatePostSchema), authenticate, checkRole(["author", "admin"]), updatePost);
postRouter.delete("/:id", idValidate(idSchema), authenticate, checkRole(["author", "admin"]), deletePost);

export default postRouter;