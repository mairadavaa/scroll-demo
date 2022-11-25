import jwt from "jsonwebtoken";

export const createAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN!, { expiresIn: "1d" });
};
export const createRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN!, { expiresIn: "3d" });
};
export const createPasswordToken = (payload: object) => {
  return jwt.sign(payload, process.env.PASSWORD_TOKEN!, { expiresIn: "25m" });
};
