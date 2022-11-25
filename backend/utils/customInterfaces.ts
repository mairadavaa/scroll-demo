import { IUser } from "./types";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: IUser;
}
