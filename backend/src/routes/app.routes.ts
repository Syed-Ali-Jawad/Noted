import { Router } from "express";
import authRouter from "./auth.routes.js";
import noteRouter from "./notes.routes.js";

const appRouter = Router();

appRouter.use(authRouter)
appRouter.use("/notes", noteRouter)

export default appRouter;
