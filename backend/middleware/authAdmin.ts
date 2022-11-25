import { Response, NextFunction } from "express";
import { CustomRequest } from "../utils/customInterfaces";

export const authAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role === "Admin") {
      next();
    } else {
      return res.status(400).json({ msg: "Admin access denied" });
    }
  } catch (error) {
    return res.status(500).json({ msg: (error as Error).message });
  }
};
