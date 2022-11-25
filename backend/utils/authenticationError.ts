import bcrypt from "bcryptjs";
import { findUserByKey } from "./findDocument";
import { emailValidator, passwordValidator } from "./validators";

export const newUserValidator = async (email: string, password: string, confirmPass: string) => {
  const errors: { [name: string]: string } = {};
  const exUser = await findUserByKey({ email });
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!email.match(emailValidator)) {
    errors.email = "Please enter a valid email address.";
  } else if (exUser) {
    if (!exUser.isVerified) {
      errors.email = "We already sent an account verification link to your email. Please check it.";
    } else {
      errors.email = "This email already exists in our system.";
    }
  }
  if (!password) {
    errors.password = "Please enter your password.";
  } else if (!passwordValidator.test(password)) {
    errors.password =
      "Password must has at least 8 characters that include at least 2 uppercase letters, 2 lowercase letters, 2 numbers and a special character in (!@#$%^&/*-+)";
  }
  if (!confirmPass) {
    errors.cfNewPass = "Please enter your confirm password.";
  } else if (confirmPass !== password) {
    errors.cfNewPass = "Passwords don't match. Check again.";
  }
  return errors;
};
export const loginValidator = async (email: string, password: string) => {
  const errors: { [name: string]: string } = {};
  const exUser = await findUserByKey({ email });
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!email.match(emailValidator)) {
    errors.email = "Please enter a valid email address.";
  } else if (exUser) {
    const passMatch = await bcrypt.compare(password, exUser.password);
    if (!exUser.isVerified) {
      errors.email = "We already sent an account verification link to your email. Please check it.";
    } else if (!passMatch) {
      errors.password = "Your password is incorrect.";
    }
  } else if (!exUser) {
    errors.email = "This user doesn't exist. Please register now.";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  }
  return errors;
};
export const forPassValidator = async (email: string) => {
  const errors: { [name: string]: string } = {};
  const exUser = await findUserByKey({ email });
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!email.match(emailValidator)) {
    errors.email = "Please enter a valid email address.";
  } else if (!exUser) {
    errors.email = "This user doesn't exist. Please register now.";
  }
  return errors;
};
export const resPassValidator = async (newPass: string, cfNewPass: string) => {
  const errors: { [name: string]: string } = {};
  if (!newPass) {
    errors.newPass = "Please enter your new password.";
  } else if (!passwordValidator.test(newPass)) {
    errors.newPass =
      "Password must has at least 8 characters that include at least 2 uppercase letters, 2 lowercase letters, 2 numbers and a special character in (!@#$%^&/*-+)";
  }
  if (!cfNewPass) {
    errors.cfNewPass = "Please confirm your new password.";
  } else if (cfNewPass !== newPass) {
    errors.cfNewPass = "Passwords don't match.";
  }
  return errors;
};
