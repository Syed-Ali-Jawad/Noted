import type { Request, Response } from "express";
import { login, registerUser } from "../services/auth.service.js";

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await login(email, password);

    return res.status(200).json({ data });
};

export const registerController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const user = await registerUser(name, email, password)

    return res.status(201).json({ success: true, message: "User registered", user })
}