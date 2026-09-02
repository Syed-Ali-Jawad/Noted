import { Router } from "express";
import {
  loginController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const authRouter = Router();

authRouter.post("/login", loginController);

authRouter.post("/register", registerController);

authRouter.post("/token/refresh", refreshTokenController);

export default authRouter;
