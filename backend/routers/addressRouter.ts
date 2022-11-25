import { Router } from "express";
import { auth } from "../middleware/auth";
import { addressCtrl } from "../controllers/addressCtrl";

export const addressRouter = Router();

addressRouter.route("/address").patch(auth, addressCtrl.updateAddress).post(auth, addressCtrl.createNewAddress);
