import "./src/types/express.d.ts";
import express from "express";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import notFound from "./src/middlewares/notFound.js";
import cors from "cors";
import appRouter from "./src/routes/app.routes.js";

export default function createApp() {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", appRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
