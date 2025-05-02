import { Router  } from "express";
const postRouter = Router();
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
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
    chekAdminRole,
    chekAuthorRole
} from "../middlewares/authMiddleware.js";

postRouter.post("/create", createPostValidate(createPostSchema), authenticate, chekAuthorRole, chekAdminRole, createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/:id", idValidate(idSchema), getPostById);
postRouter.patch("/:id", idValidate(idSchema), updatePostValidate(updatePostSchema), authenticate, chekAuthorRole, chekAdminRole, updatePost);
postRouter.delete("/:id", idValidate(idSchema), authenticate, chekAuthorRole, chekAdminRole, deletePost);

export default postRouter;