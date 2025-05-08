import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import {
  getActivityLog,
  getAllActivityLog,
} from "../controller/activitylog.controller.ts";

const activityRoute = new Hono();

activityRoute.get("/", authMiddleware, getActivityLog);
activityRoute.get("/all", authMiddleware, getAllActivityLog);

export default activityRoute;