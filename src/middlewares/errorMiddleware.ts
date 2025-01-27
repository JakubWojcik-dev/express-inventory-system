import { NextFunction, Request, Response } from "express";
import { IError } from "../types/error";

export const errorMiddleware = () => {
  return (err: IError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({
        message:
          "Invalid data format. Only JSON format or empty data in GET method case",
        error: err.message,
      });
    }
    next(err);
  };
};
