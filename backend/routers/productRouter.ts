import { Router } from "express";
import { auth } from "../middleware/auth";
import { authAdmin } from "../middleware/authAdmin";
import { productCtrl } from "../controllers/productCtrl";

export const productRouter = Router();

productRouter
  .route("/product")
  .get(productCtrl.getProducts)
  .post(auth, authAdmin, productCtrl.createNewProduct);
productRouter
  .route("/product/:id")
  .patch(auth, authAdmin, productCtrl.updateProduct)
  .delete(auth, authAdmin, productCtrl.deleteProduct);
