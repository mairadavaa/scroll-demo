import { IAddress } from "../utils/types";
import { Schema, model, Types } from "mongoose";

const AddressSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: "User" },
    country: { type: String, required: true, trim: true },
    stateProvince: { type: String, required: true, trim: true },
    zipPostcode: { type: String, required: true, trim: true },
    citySoum: { type: String, required: true, trim: true },
    apartmentSuite: { type: String, required: true, trim: true },
    detail: { type: String, trim: true },
    phoneNum: { type: String, trim: true },
  },
  { timestamps: true }
);

export const AddressModel = model<IAddress>("Address", AddressSchema);
