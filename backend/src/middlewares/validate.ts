import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";
import { AppError } from "../errors/AppError.js";

export const validate = (
  schema: ZodObject,
  source: "body" | "query" | "params" = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(
        new AppError(
          400,
          `Validation error: ${result.error.issues.map((issue) => issue.message).join(", ")}`,
        ),
      );
    }

    req[source] = result.data;
    next();
  };
};
