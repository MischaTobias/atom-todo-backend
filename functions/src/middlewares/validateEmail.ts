import {Request, Response, NextFunction} from "express";
import validator from "validator";

export const validateEmailFromParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const email = req.params.email as string;

  if (!validator.isEmail(email)) {
    res.status(400).json({error: "Email is not valid"});
    return;
  }

  next();
};

export const validateEmailFromBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const email = req.body.email as string;

  if (!validator.isEmail(email)) {
    res.status(400).json({error: "Email is not valid"});
    return;
  }

  next();
};
