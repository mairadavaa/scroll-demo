import { UserModel } from "../models/userModel";
import { ProductModel } from "../models/productModel";
import { AddressModel } from "../models/addressModel";
import { CategoryModel } from "../models/categoryModel";

//Authentication

export const findUserByKey = async (payload: Object) => {
  return await UserModel.findOne(payload);
};
export const findUserByID = async (payload: string | undefined) => {
  return await UserModel.findById(payload);
};
export const updateUserByID = async (id: string | undefined, data: object) => {
  return await UserModel.findByIdAndUpdate(id, data);
};

//Category

export const updateCategoryByID = async (id: string, data: object) => {
  return await CategoryModel.findByIdAndUpdate(id, data);
};
export const deleteCategoryByID = async (id: string) => {
  return await CategoryModel.findByIdAndDelete(id);
};
export const findCategoryByKey = async (payload: Object) => {
  return await CategoryModel.findOne(payload);
};

//Product

export const findProductByKey = async (payload: object) => {
  return await ProductModel.findOne(payload);
};
export const findProductByID = async (payload: string | undefined) => {
  return await ProductModel.findById(payload);
};

//Address
export const findAddressByKey = async (payload: object) => {
  return await AddressModel.findOne(payload);
};
export const updateAddressByKey = async (id: object, data: object) => {
  return await AddressModel.findOneAndUpdate(id, data);
};
