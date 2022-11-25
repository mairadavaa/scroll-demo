import { Schema, model } from "mongoose";
import { ICategory } from "../utils/types";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const CategoryModel = model<ICategory>("Category", CategorySchema);
