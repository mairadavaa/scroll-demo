import { findCategoryByKey } from "./findDocument";

export const newCategoryValidator = async (name: string) => {
  const errors: { [name: string]: string } = {};
  const exCategory = await findCategoryByKey({ name });
  if (!name) {
    errors.catName = "Please enter a category name.";
  } else if (exCategory) {
    errors.catName = "This category already exists.";
  }
  return errors;
};
export const updateCategoryValidator = async (name: string) => {
  const errors: { [name: string]: string } = {};
  const exCategory = await findCategoryByKey({ name });
  if (!name) {
    errors.catName = "Please enter a category name.";
  } else if (exCategory) {
    errors.catName = "This category already exists.";
  }
  return errors;
};
