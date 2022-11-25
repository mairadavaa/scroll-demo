import { IImage } from "../utils/types";
import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    filename: { type: String, unique: true, required: true },
    contentType: { type: String, required: true },
    imageBase64: { type: String, required: true },
  },
  { timestamps: true }
);

export const ImageModel = model<IImage>("Image", ImageSchema);
