import { Hono } from "hono";
import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
} from "../controller/project.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const projectRoute = new Hono();

projectRoute.post("/", authMiddleware, createProjectController);
projectRoute.get("/", authMiddleware, getProjectsController);
projectRoute.get("/:id", authMiddleware, getProjectByIdController);
projectRoute.put("/:id", authMiddleware, updateProjectController);
projectRoute.delete("/:id", authMiddleware, deleteProjectController);

export default projectRoute;
