export const productValidator = (title: string, price: number, gender: string, category: string, quantity: number, description: string) => {
  const errors: { [name: string]: string } = {};
  if (!title) {
    errors.title = "Please fill out this field.";
  }
  if (!price) {
    errors.price = "Please fill out this field.";
  }
  if (!gender) {
    errors.gender = "Please fill out this field.";
  }
  if (!category) {
    errors.category = "Please fill out this field.";
  }
  if (!quantity) {
    errors.quantity = "Please fill out this field.";
  }
  if (!description) {
    errors.description = "Please fill out this field.";
  }
  return errors;
};
