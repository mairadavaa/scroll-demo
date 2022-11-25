import { Router } from "express";
import { auth } from "../middleware/auth";
import { authAdmin } from "../middleware/authAdmin";
import { categoryCtrl } from "../controllers/categoryCtrl";

export const categoryRouter = Router();

categoryRouter
  .route("/category/")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createNewCategory);
categoryRouter
  .route("/category/:id")
  .patch(auth, authAdmin, categoryCtrl.updateCategory)
  .delete(auth, authAdmin, categoryCtrl.deleteCategory);
