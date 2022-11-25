import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { findUserByID } from "./../utils/findDocument";
import { CustomRequest } from "../utils/customInterfaces";

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ msg: "Please login first." });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN!);
    const currentUser = await findUserByID((<any>decoded).id);
    if (currentUser) {
      req.user = currentUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({ msg: (error as Error).message });
  }
};
