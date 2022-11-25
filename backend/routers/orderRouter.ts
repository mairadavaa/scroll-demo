import { Router } from "express";
import { auth } from "../middleware/auth";
import { authAdmin } from "../middleware/authAdmin";
import { orderCtrl } from "../controllers/orderCtrl";

export const orderRouter = Router();

orderRouter
  .route("/order")
  .post(auth, orderCtrl.createNewOrder)
  .get(auth, authAdmin, orderCtrl.adminGetOrders);
orderRouter
  .route("/order/:id")
  .patch(auth, authAdmin, orderCtrl.updateOrder)
  .delete(auth, authAdmin, orderCtrl.deleteOrder);
