import { Hono } from "hono";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUserController,
  deleteUserController,
  getCurrentUser
} from "../controller/user.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

const userRoute = new Hono();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);
userRoute.get("/me", authMiddleware, getCurrentUser);
userRoute.get("/", authMiddleware, getUsers);
userRoute.get("/:id", authMiddleware, getUserById);
userRoute.patch("/:id", authMiddleware, updateUserController);
userRoute.delete("/:id", authMiddleware, deleteUserController);

export default userRoute;