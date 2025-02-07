import {Router} from "express";
import {TaskService} from "../services/task.service";
import {validateUserId} from "../middlewares/validateUserId";
import {Task} from "../models/Task";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/", validateUserId, async (req, res, next) => {
  try {
    const userId = req.userId as string;
    const tasks = await TaskService.getTasksByUserId(userId);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateUserId, async (req, res, next) => {
  try {
    const userId = req.userId as string;
    const task = await TaskService.createTask(userId, req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId", validateUserId, async (req, res, next) => {
  try {
    const userId = req.userId as string;
    const task = req.body as Task;

    const updatedTask = await TaskService.updateTask(task, userId);

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId", validateUserId, async (req, res, next) => {
  try {
    const userId = req.userId as string;
    const taskId = req.params.taskId as string;

    await TaskService.deleteTask(taskId, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
