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

postRouter.post("/create", authenticate, createPostValidate(createPostSchema), checkRole(["author", "admin"]), createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/category/:id", getPostsByCategoryId);
postRouter.get("/:id", idValidate(idSchema), getPostById);
postRouter.patch("/:id", authenticate, idValidate(idSchema), updatePostValidate(updatePostSchema), checkRole(["author", "admin"]), updatePost);
postRouter.delete("/:id", authenticate, idValidate(idSchema), checkRole(["author", "admin"]), deletePost);

export default postRouter;