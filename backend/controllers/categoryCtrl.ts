import { Request, Response } from "express";
import { CategoryModel } from "../models/categoryModel";
import { newCategoryValidator, updateCategoryValidator } from "../utils/categoryError";
import { findProductByKey, updateCategoryByID, deleteCategoryByID } from "../utils/findDocument";

export const categoryCtrl = {
  createNewCategory: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const err = await newCategoryValidator(name);
      if (Object.keys(err).length > 0) return res.status(400).json({ msg: err });
      const newCategory = new CategoryModel({ name });
      await newCategory.save();
      res.status(201).json({ msg: "New category successfully created." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  deleteCategory: async (req: Request, res: Response) => {
    try {
      const product = await findProductByKey({ category: req.params.id });
      if (product)
        return res.status(400).json({
          msg: "Cannot be deleted, because there are products with this category.",
        });
      await deleteCategoryByID(req.params.id);
      res.status(200).json({ msg: "Category deleted." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  updateCategory: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const err = await updateCategoryValidator(name);
      if (Object.keys(err).length > 0) return res.status(400).json({ msg: err });
      await updateCategoryByID(req.params.id, { name });
      res.status(201).json({ msg: "Category updated." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
};
