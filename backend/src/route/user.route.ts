import { Hono } from "hono";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserController,
  deleteUserController,
} from "../controller/user.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const userRoute = new Hono();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/", authMiddleware, getUsers);
userRoute.get("/:id", authMiddleware, getUserById);
userRoute.patch("/:id", authMiddleware, updateUserController);
userRoute.delete("/:id", authMiddleware, deleteUserController);

export default userRoute;
