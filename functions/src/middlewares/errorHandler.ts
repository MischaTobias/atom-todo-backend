import {Request, Response, NextFunction} from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error: ", err.message);

  if (!res.headersSent) {
    res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
};
