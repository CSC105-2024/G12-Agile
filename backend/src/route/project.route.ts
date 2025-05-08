import { Hono } from "hono";
import {
  createProjectController,
  getProjectByIdController,
  getAllProjects,
  updateProjectController,
  deleteProjectController,
} from "../controller/project.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const projectRoute = new Hono();

projectRoute.post("/", authMiddleware, createProjectController);
projectRoute.get("/", authMiddleware, getAllProjects);
projectRoute.get("/:id", authMiddleware, getProjectByIdController);
projectRoute.patch("/:id", authMiddleware, updateProjectController);
projectRoute.delete("/:id", authMiddleware, deleteProjectController);

export default projectRoute;
