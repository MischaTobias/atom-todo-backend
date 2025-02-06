import { db } from "./firestore.service";
import { User } from "../models/User";

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const snapshot = await db
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (snapshot.empty) return null;

      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...(userDoc.data() as User) };
    } catch (error) {
      console.error("Error fetching user by email: ", error);
      throw new Error("Failed to fetch user by email. Please try again later.");
    }
  }

  static async createUser(user: User): Promise<User> {
    try {
      const newUser = await db.runTransaction(async (transaction) => {
        const existingUser = await this.getUserByEmail(user.email);

        if (!!existingUser) throw new Error("User already exists.");

        const doctRef = db.collection("users").doc();
        transaction.set(doctRef, user);

        return { id: doctRef.id, ...user };
      });

      return newUser;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw new Error("Failed to create user. Please try again later.");
    }
  }
}
