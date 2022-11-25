import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import {
  findUserByID,
  findUserByKey,
  updateUserByID,
} from "../utils/findDocument";
import {
  sendVerificationLink,
  sendResetPasswordLink,
} from "../utils/sendEmailConfig";
import {
  createAccessToken,
  createRefreshToken,
  createPasswordToken,
} from "../utils/generateTokens";
import {
  loginValidator,
  newUserValidator,
  forPassValidator,
  resPassValidator,
} from "../utils/authenticationError";

export const userCtrl = {
  createNewUser: async (req: Request, res: Response) => {
    try {
      const { email, password, confirmPass } = req.body;
      const err = await newUserValidator(email, password, confirmPass);
      if (Object.keys(err).length > 0)
        return res.status(400).json({ msg: err });
      const encryptedPass = await bcrypt.hash(password, 12);
      const newUser = new UserModel({
        email,
        password: encryptedPass,
        emailToken: crypto.randomBytes(64).toString("hex"),
      });
      await newUser.save();
      sendVerificationLink(
        req.headers.host!,
        newUser.email,
        newUser.emailToken
      );
      res.status(200).json({
        msg: "We sent an email verification link to your email. Please check it.",
      });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  emailVerification: async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      if (!token)
        return res.status(400).json({ msg: "Please register first." });
      const exUser = await findUserByKey({ emailToken: token });
      await updateUserByID((<any>exUser)._id, {
        emailToken: "",
        isVerified: true,
      });
      res.redirect(`${process.env.CLIENT_URL!}?loginOpen=true`);
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const err = await loginValidator(email, password);
      if (Object.keys(err).length > 0)
        return res.status(400).json({ msg: err });
      const user = await UserModel.findOne({ email })
        .populate("address")
        .populate({
          path: "orders",
          populate: {
            path: "orderItems",
          },
        });
      const access_token = createAccessToken({ id: user?._id });
      const refresh_token = createRefreshToken({ id: user?._id });
      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "http://localhost:5000/api/auth/refresh_token",
        maxAge: 3 * 24 * 3600 * 1000,
      });
      res
        .status(200)
        .json({ msg: "User logged in", user, token: access_token });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const err = await forPassValidator(email);
      if (Object.keys(err).length > 0)
        return res.status(400).json({ msg: err });
      const user = await findUserByKey({ email });
      const passToken = createPasswordToken({ id: user?._id });
      sendResetPasswordLink(process.env.CLIENT_URL!, email, passToken);
      res.status(200).json({
        msg: "We sent a reset password link to email. Please check it.",
      });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { newPass, cfNewPass } = req.body;
      const err = await resPassValidator(newPass, cfNewPass);
      if (Object.keys(err).length > 0)
        return res.status(400).json({ msg: err });
      const decoded = jwt.verify(token, process.env.PASSWORD_TOKEN!);
      const encryptedPass = await bcrypt.hash(newPass, 12);
      await updateUserByID((<any>decoded).id, { password: encryptedPass });
      res.status(200).json({ msg: "Your password successfully changed." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  generateRefreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });
      const decoded = jwt.verify(rf_token, process.env.REFRESH_TOKEN!);
      const user = await UserModel.findById((<any>decoded).id).populate(
        "address orders"
      );
      const access_token = createAccessToken({ id: user?.id });
      res.status(200).json({ user, token: access_token });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/auth/refresh_token" });
      res.status(200).json({ msg: "User logged out." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
};
