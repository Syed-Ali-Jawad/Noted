import type { Request, Response } from "express";
import { login, registerUser } from "../services/auth.service.js";
import { signToken, verifyToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password, shallRemember } = req.body;

  const data = await login(email, password, shallRemember);

  return res.status(200).json({ data });
};

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  return res
    .status(201)
    .json({ success: true, message: "User registered", user });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const decodedToken = verifyToken(refreshToken, true) as {
    userId: string;
  };
  const token = signToken({ userId: decodedToken.userId });
  return res
    .status(200)
    .json({ success: true, message: "Token refreshed", token });
};
