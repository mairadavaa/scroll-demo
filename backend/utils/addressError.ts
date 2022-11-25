export const addValidator = (country: string, citySoum: string, zipPostcode: string, stateProvince: string, apartmentSuite: string) => {
  const errors: { [name: string]: string } = {};
  if (!country) {
    errors.country = "Please fill out this field.";
  }
  if (!citySoum) {
    errors.citySoum = "Please fill out this field.";
  }
  if (!zipPostcode) {
    errors.zipPostcode = "Please fill out this field.";
  }
  if (!stateProvince) {
    errors.stateProvince = "Please fill out this field.";
  }
  if (!apartmentSuite) {
    errors.apartmentSuite = "Please fill out this field.";
  }
  return errors;
};
