import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

type Env = {
  dbUrl: string;
  port: string;
  jwtSecret: string;
  refreshSecret: string;
  jwtExpiresIn: NonNullable<SignOptions["expiresIn"]>;
  jwtRefreshExpiresIn: NonNullable<SignOptions["expiresIn"]>;
};
``
export const env: Env = {
  dbUrl: process.env.DATABASE_URL!,
  port: process.env.PORT || "3000",
  jwtSecret: process.env.JWT_SECRET!,
  refreshSecret: process.env.REFRESH_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN! as NonNullable<
    SignOptions["expiresIn"]
  >,
  jwtRefreshExpiresIn: process.env.REFRESH_EXPIRES_IN! as NonNullable<
    SignOptions["expiresIn"]
  >,
};
