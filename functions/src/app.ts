import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Todo API working");
});

app.use(errorHandler);

export const api = functions.https.onRequest(app);
