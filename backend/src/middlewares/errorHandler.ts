import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import logger from "../lib/logger.js";


export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
