import { db } from "./firestore.service";
import { User } from "../models/User";

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const existingUser = snapshot.docs[0];
    return { id: existingUser.id, ...(existingUser.data() as User) };
  }

  static async createUser(user: User): Promise<User> {
    const newUser = await db.runTransaction(async (transaction) => {
      const existingUser = await this.getUserByEmail(user.email);

      if (!!existingUser) {
        return existingUser;
      }

      const doctRef = db.collection("users").doc();
      transaction.set(doctRef, user);

      return { id: doctRef.id, ...user };
    });

    return newUser;
  }
}
