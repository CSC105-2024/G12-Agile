import { Hono } from "hono";
import {
  addMemberController,
  removeMemberController,
  getAllMembersController
} from "../controller/member.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const memberRoute = new Hono();

memberRoute.use("*", authMiddleware);
memberRoute.post("/", addMemberController);
memberRoute.delete("/", removeMemberController);
memberRoute.get("/:projectId", getAllMembersController); 

export default memberRoute;
