import { Router  } from "express";
const postRouter = Router();
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
    getPostsByCategoryId,
    getPostsByAuthorId,
    getPostsOfCategoryOfUser,
    getPostsByPagination
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
    checkPermission,
} from "../middlewares/authMiddleware.js";
import {uploadPost} from "../middlewares/uploadMiddleware.js";


postRouter.post("/create", authenticate, checkPermission(["createPost"]), uploadPost.single("postImage"), createPostValidate(createPostSchema), createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/", getPostsByPagination);
postRouter.get("/author/:id", idValidate(idSchema), getPostsByAuthorId);
postRouter.get("/category/:id", getPostsByCategoryId);
postRouter.get("/users/:id/posts", authenticate, idValidate(idSchema), getPostsOfCategoryOfUser);
postRouter.get("/:id", idValidate(idSchema), getPostById);
postRouter.patch("/:id", authenticate, checkPermission(["updateOwnPost", "updateAnyPost"]), idValidate(idSchema), updatePostValidate(updatePostSchema), updatePost);
postRouter.delete("/:id", authenticate, checkPermission(["deleteOwnPost", "deleteAnyPost"]), idValidate(idSchema), deletePost);

export default postRouter;