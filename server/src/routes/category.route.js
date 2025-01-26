import { Router } from "express";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategoryDetails,
} from "../controllers/category.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { Upload } from "../middleware/multer.js";

const categoryRoutes = Router();

categoryRoutes.route("/").get(getAllCategories);
categoryRoutes
.route("/:id")
.get(getSingleCategory)
.delete(verifyToken, deleteCategory)
.patch(verifyToken, Upload.single("coverPicture"), updateCategoryDetails);
categoryRoutes
.route("/add-new")
.post(verifyToken, Upload.single("coverPicture"), addNewCategory);

export default categoryRoutes;
