import { Router  } from "express";
const categoryRouter = Router();
import {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllCategories
} from "../controllers/categoryController.js";
import {
    createCategoryValidate,
    updateCategoryValidate,
} from "../middlewares/categoryMiddleware.js";
import {
    createCategorySchema,
    updateCategorySchema,
    idSchema,
} from "../middlewares/schemas.js";
import { idValidate } from "../middlewares/abstractMiddleware.js";
import { authenticate, chekAdminRole } from "../middlewares/authMiddleware.js";

categoryRouter.post("/create", createCategoryValidate(createCategorySchema), authenticate, chekAdminRole, createCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/:id", idValidate(idSchema), getCategoryById);
categoryRouter.patch("/:id", idValidate(idSchema) ,updateCategoryValidate(updateCategorySchema), authenticate, chekAdminRole, updateCategory);
categoryRouter.delete("/:id", idValidate(idSchema), authenticate, chekAdminRole,  deleteCategory);

export default categoryRouter;