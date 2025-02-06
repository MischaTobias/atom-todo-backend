import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1] as string;
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as any;
  const userId = decodedToken.userId;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  req.userId = userId;

  next();
};
