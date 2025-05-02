import { Router  } from "express";
const commentRouter = Router();

import {
    createComment,
    getAllComments,
    getAllCommentsByPostId,
    getCommentById,
} from "../controllers/commentController.js";
import {
    idSchema,
    createCommentSchema
} from "../middlewares/schemas.js";
import { idValidate } from "../middlewares/abstractMiddleware.js";
import { createCommentValidate } from "../middlewares/commentMiddleware.js";

commentRouter.post("/create", createCommentValidate(createCommentSchema), createComment);
commentRouter.get("/all", getAllComments);
commentRouter.get("/post/:id", idValidate(idSchema), getAllCommentsByPostId);
commentRouter.get("/:id", idValidate(idSchema), getCommentById);

export default commentRouter;