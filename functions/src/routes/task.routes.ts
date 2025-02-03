import { Router } from "express";
import { TaskService } from "../services/task.service";
import { validateUserId } from "../middlewares/validateUserId";

const router = Router();

router.get("/", validateUserId, async (req, res, next) => {
  try {
    const userId = req.query.userId as string;
    const tasks = await TaskService.getTasksByUserId(userId);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

export default router;
