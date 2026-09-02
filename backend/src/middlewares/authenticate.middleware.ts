import "../types/express.d.ts";
import type { Response, Request, NextFunction } from "express"
import { AppError } from "../errors/AppError.js"
import { verifyToken } from "../lib/jwt.js";

const authenticate = (req: Request, _res: Response, next: NextFunction) => {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        throw new AppError(401, `Unauthorized: ${!header ? "Header not passed" : !header.startsWith("Bearer ") ? "Doesnt have Bearer prefix" : "Invalid header format"}`)
    }

    const token = header.split(" ")[1]

    if (!token)
        throw new AppError(401, "Unauthorized: No token passed")


    const decodedToken = verifyToken(token)
    const { userId } = decodedToken;

    req.userId = userId;

    next()
}

export default authenticate