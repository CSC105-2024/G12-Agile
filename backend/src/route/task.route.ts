import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskById,
  claimTaskByEmail,
  getTasksByProjectId,
} from "../controller/task.controller.ts";

const taskRoute = new Hono();

taskRoute.use("*", authMiddleware);

taskRoute.get("/projects/:projectId", getTasksByProjectId);
taskRoute.post("/", createTaskController);
taskRoute.get("/:id", getTaskById);
taskRoute.patch("/:id", updateTaskController);
taskRoute.post("/:id/claim", claimTaskByEmail);
taskRoute.delete("/:id", deleteTaskController);

export default taskRoute;
