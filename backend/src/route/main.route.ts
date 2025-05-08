import { Hono } from "hono";
import userRoute from "./user.route.ts";
import projectRoute from "./project.route.ts";
import sprintRoute from "./sprint.route.ts";
import taskRoute from "./task.route.ts";
import memberRoute from "./member.route.ts";
import activityRoute from "./activitylog.route.ts";

const mainRouter = new Hono();

mainRouter.route("/users", userRoute);
mainRouter.route("/projects", projectRoute);
mainRouter.route("/sprints", sprintRoute);
mainRouter.route("/tasks", taskRoute);
mainRouter.route("/members", memberRoute);
mainRouter.route("/activities", activityRoute);

export default mainRouter;