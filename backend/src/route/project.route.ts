import { Hono } from "hono";
import {
  createFullProjectController,
  getAllProjects,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
} from "../controller/project.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const projectRoute = new Hono();

projectRoute.use(authMiddleware);

projectRoute.post("/", createFullProjectController);
projectRoute.get("/", getAllProjects);
projectRoute.get("/:id", getProjectByIdController);
projectRoute.patch("/:id", updateProjectController);
projectRoute.delete("/:id", deleteProjectController);

export default projectRoute;
