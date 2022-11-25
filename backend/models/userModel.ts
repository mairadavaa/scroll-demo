import { IUser } from "../utils/types";
import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
    emailToken: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    address: { type: Types.ObjectId, ref: "Address" },
    orders: [{ type: Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
