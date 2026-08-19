import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"
import { env } from "../config/env.js"
import { AppError } from "../errors/AppError.js"

export interface UserTokenPayload extends JwtPayload {
    userId: string;
}

export const signToken = (payload: { userId: string } | UserTokenPayload) => {
    const options: SignOptions = {
        expiresIn: (env.jwtExpiresIn as SignOptions["expiresIn"]) || "15m"
    }
    return jwt.sign(payload, env.jwtSecret, options)
}

export const verifyToken = (token: string): UserTokenPayload => {
    try {
        return jwt.verify(token, env.jwtSecret) as UserTokenPayload
    } catch (err) {
        throw new AppError(401, "Unauthorized")
    }
}