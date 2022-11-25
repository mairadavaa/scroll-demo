import { Response } from "express";
import { addValidator } from "../utils/addressError";
import { AddressModel } from "../models/addressModel";
import { CustomRequest } from "../utils/customInterfaces";
import { updateAddressByKey, updateUserByID } from "../utils/findDocument";

export const addressCtrl = {
  createNewAddress: async (req: CustomRequest, res: Response) => {
    try {
      const { detail, country, citySoum, zipPostcode, stateProvince, apartmentSuite } = req.body;
      const err = addValidator(country, citySoum, zipPostcode, stateProvince, apartmentSuite);
      if (Object.keys(err).length > 0) return res.status(400).json({ msg: err });
      const newAddress = new AddressModel({ owner: req.user?._id, detail, country, citySoum, zipPostcode, stateProvince, apartmentSuite });
      await newAddress.save();
      await updateUserByID(req.user?._id, { address: newAddress._id });
      res.status(200).json({ msg: "Address created" });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  updateAddress: async (req: CustomRequest, res: Response) => {
    try {
      const { detail, country, citySoum, zipPostcode, stateProvince, apartmentSuite } = req.body;
      const err = addValidator(country, citySoum, zipPostcode, stateProvince, apartmentSuite);
      if (Object.keys(err).length > 0) return res.status(400).json({ msg: err });
      await updateAddressByKey({ owner: req.user?._id }, { detail, country, citySoum, zipPostcode, stateProvince, apartmentSuite });
      res.status(200).json({ msg: "Address updated." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
};
