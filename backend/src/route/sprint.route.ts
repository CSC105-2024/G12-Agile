import { Hono } from "hono";
import {
  createSprintController,
  getSprintsByProject,
  updateSprintController,
  deleteSprintController,
  getSprintById,
} from "../controller/sprint.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const sprintRoute = new Hono();

sprintRoute.post("/", authMiddleware, createSprintController);
sprintRoute.get("/projects/:projectId", authMiddleware, getSprintsByProject);
sprintRoute.get("/:id", authMiddleware, getSprintById);
sprintRoute.patch("/:id", authMiddleware, updateSprintController);
sprintRoute.delete("/:id", authMiddleware, deleteSprintController);

export default sprintRoute;
