import { Router } from "express";
import {authenticate, checkPermission} from "../middlewares/authMiddleware.js";
import {getInitialData} from "../controllers/initialController.js";
const initialRouter = Router();

initialRouter.get("/", authenticate, checkPermission(["isAdmin"]), getInitialData);

export default initialRouter;