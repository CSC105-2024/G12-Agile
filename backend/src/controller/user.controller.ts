import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.ts";
import {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  removeUser,
} from "../model/user.model.ts";

const registerUser = async (c: any) => {
  const { firstname, lastname, email, password, role } = await c.req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ firstname, lastname, email, password: hashedPassword, role });
  return c.json(user);
};

const loginUser = async (c: any) => {
    const { email, password, rememberMe } = await c.req.json();
    const users = await findUsers();
    const user = users.find((u) => u.email === email);
  
    if (!user) return c.json({ error: "User not found" }, 404);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return c.json({ error: "Invalid credentials" }, 401);
  
    const expiresIn = rememberMe ? "30d" : "2h";
    const token = generateToken(
      { id: user.id, role: user.role, email: user.email },
      expiresIn
    );
  
    return c.json({ message: "Login successful", token, user });
  };

const getUsers = async (c: any) => {
  const users = await findUsers();
  return c.json(users);
};

const getUserById = async (c: any) => {
  const userId = parseInt(c.req.param("id"), 10);
  const user = await findUserById(userId);
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
};

const updateUserController = async (c: any) => {
  const userId = parseInt(c.req.param("id"), 10);
  const userData = await c.req.json();
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  const updatedUser = await updateUser(userId, userData);
  return c.json(updatedUser);
};

const deleteUserController = async (c: any) => {
  const userId = parseInt(c.req.param("id"), 10);
  await removeUser(userId);
  return c.json({ message: "User deleted successfully" });
};

export {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserController,
  deleteUserController
};
