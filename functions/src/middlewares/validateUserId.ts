import { Request, Response, NextFunction } from "express";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  next();
};
