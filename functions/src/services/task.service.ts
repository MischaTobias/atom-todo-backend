import { db } from "../services/firestore.service";
import { Task } from "../models/Task";

export class TaskService {
  static async getTasksByUserId(userId: string): Promise<Task[]> {
    const snapshot = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .get();
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Task),
      id: doc.id,
    }));
  }
}
