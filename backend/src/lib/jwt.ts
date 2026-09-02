import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";

export interface UserTokenPayload extends JwtPayload {
  userId: string;
}

export const signToken = (
  payload: { userId: string } | UserTokenPayload,
  isRefreshToken: boolean = false,
) => {
  const expiresIn = isRefreshToken ? env.jwtRefreshExpiresIn : env.jwtExpiresIn;
  const jwtSecret = isRefreshToken ? env.refreshSecret : env.jwtSecret;
  const options: SignOptions = {
    expiresIn,
  };
  return jwt.sign(payload, jwtSecret, options);
};

export const verifyToken = (
  token: string,
  isRefreshToken: boolean = false,
): UserTokenPayload => {
  try {
    const secret = isRefreshToken ? env.refreshSecret : env.jwtSecret;
    return jwt.verify(token, secret) as UserTokenPayload;
  } catch (err) {
    throw new AppError(401, "Unauthorized");
  }
};
