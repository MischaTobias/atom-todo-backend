import { Router } from "express";
import { UserService } from "../services/user.service";
import {
  validateEmailFromBody,
  validateEmailFromParams,
} from "../middlewares/validateEmail";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/:email", validateEmailFromParams, async (req, res, next) => {
  try {
    const email = (req.params.email as string).trim().toLowerCase();
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ jwt: token, user });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateEmailFromBody, async (req, res, next) => {
  try {
    const email = (req.body.email as string).trim().toLowerCase();

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const user = await UserService.createUser({ email });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ jwt: token, user });
  } catch (error) {
    next(error);
  }
});

export default router;
