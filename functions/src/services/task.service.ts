import {db} from "./firestore.service";
import {Task} from "../models/Task";

/**
 *
 */
export class TaskService {
  /**
   *
   * @param {string} userId
   */
  static async getTasksByUserId(userId: string): Promise<Task[]> {
    try {
      const snapshot = await db
        .collection("tasks")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map((doc) => {
        const task = doc.data() as Task;
        task.id = doc.id;

        return task;
      });
    } catch (error) {
      console.error("Error fetching tasks by userId: ", error);
      throw new Error(
        "Failed to fetch tasks by userId. Please try again later."
      );
    }
  }

  /**
   *
   * @param {string} userId
   * @param {Task}task
   */
  static async createTask(userId: string, task: Task): Promise<Task> {
    try {
      task.userId = userId;
      task.completed = false;
      task.createdAt = new Date().toISOString();

      const docRef = db.collection("tasks").doc();

      await db.runTransaction(async (transaction) => {
        transaction.set(docRef, task);
      });

      return task;
    } catch (error) {
      console.error("Error creating task: ", error);
      throw new Error("Failed to create task. Please try again later.");
    }
  }

  /**
   *
   * @param {Task} task
   * @param {string} userId
   */
  static async updateTask(task: Task, userId: string): Promise<Task> {
    try {
      const updatedTask = await db.runTransaction(async (transaction) => {
        const docRef = db.collection("tasks").doc(task.id);

        const taskDoc = await transaction.get(docRef);

        if (!taskDoc.exists) throw new Error("Task does not exist.");

        const existingTask = taskDoc.data() as Task;

        if (existingTask.userId !== userId) {
          throw new Error("Task does not belong to user.");
        }

        transaction.update(docRef, {...task});

        return task;
      });

      return updatedTask;
    } catch (error) {
      console.error("Error updating task: ", error);
      throw new Error("Failed to update task. Please try again later.");
    }
  }

  /**
   *
   * @param {string} taskId
   * @param {string} userId
   */
  static async deleteTask(taskId: string, userId: string): Promise<void> {
    try {
      await db.runTransaction(async (transaction) => {
        const docRef = db.collection("tasks").doc(taskId);

        const taskDoc = await transaction.get(docRef);

        if (!taskDoc.exists) throw new Error("Task does not exist.");

        const existingTask = taskDoc.data() as Task;

        if (existingTask.userId !== userId) {
          throw new Error("Task does not belong to user.");
        }

        transaction.delete(docRef);
      });
    } catch (error) {
      console.error("Error deleting task: ", error);
      throw new Error("Failed to delete task. Please try again later.");
    }
  }
}
