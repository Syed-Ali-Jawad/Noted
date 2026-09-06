import { Router } from "express";
import {
  loginController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { validate } from "../middlewares/validate.js";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validators/auth.validator.js";
import type { ZodSchema } from "zod/v3";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), loginController);

authRouter.post("/register", validate(registerSchema), registerController);

authRouter.post(
  "/token/refresh",
  validate(refreshTokenSchema),
  refreshTokenController,
);

export default authRouter;
