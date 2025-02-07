import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    if (!token) {
      res.status(401).json({error: "Token is required"});
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    if (!decodedToken.userId) {
      res.status(401).json({error: "User ID is required"});
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({error: "JWT expired"});
    } else {
      res.status(401).json({error: "Invalid token"});
    }
  }
};
