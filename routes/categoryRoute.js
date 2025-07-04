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
import { authenticate, checkPermission } from "../middlewares/authMiddleware.js";

categoryRouter.post("/create", authenticate, checkPermission(["createCategory"]), createCategoryValidate(createCategorySchema), createCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/:id", idValidate(idSchema), getCategoryById);
categoryRouter.patch("/:id", authenticate, checkPermission(["updateOwnCategory", "updateAnyCategory"]), idValidate(idSchema) ,updateCategoryValidate(updateCategorySchema), updateCategory);
categoryRouter.delete("/:id", authenticate, checkPermission(["deleteOwnCategory", "deleteAnyCategory"]), idValidate(idSchema), deleteCategory);


export default categoryRouter;