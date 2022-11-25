import { Router } from "express";
import { auth } from "../middleware/auth";
import { authAdmin } from "../middleware/authAdmin";
import { imageCtrl } from "../controllers/imageCtrl";

export const imageRouter = Router();
imageRouter.post("/image/upload", auth, authAdmin, imageCtrl.uploadImage);
imageRouter.post("/image/delete", auth, authAdmin, imageCtrl.deleteImage);
