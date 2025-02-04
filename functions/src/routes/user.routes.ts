import { Router } from "express";
import { UserService } from "../services/user.service";
import {
  validateEmailFromBody,
  validateEmailFromParams,
} from "../middlewares/validateEmail";

const router = Router();

router.get("/:email", validateEmailFromParams, async (req, res, next) => {
  try {
    console.log(req.params.email);
    const email = (req.params.email as string).trim().toLowerCase();
    const user = await UserService.getUserByEmail(email);

    res.status(200).json(user);
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

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
