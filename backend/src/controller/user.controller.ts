import { createUser, findUsers, findUserById, findUserByEmail, updateUser, removeUser } from "../model/user.model.ts";
import { logActivity } from "../model/activitylog.model.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.ts";

const registerUser = async (c: any) => {
  const { firstname, lastname, email, password, role } = await c.req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ firstname, lastname, email, password: hashedPassword, role });
  await logActivity(user.id, "User registered");
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
  const token = generateToken({ id: user.id, role: user.role, email: user.email }, expiresIn);

  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2;
  c.header("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}`);

  return c.json({ message: "Login successful", token, user });
};

const logoutUser = async (c: any) => {
  c.header("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0`);
  return c.json({ message: "Logout successful" });
};

const getUsers = async (c: any) => {
  const users = await findUsers();
  return c.json(users);
};

const getUserById = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const user = await findUserById(id);
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
};

const updateUserController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  if (body.password) body.password = await bcrypt.hash(body.password, 10);
  const updatedUser = await updateUser(id, body);
  await logActivity(id, "Updated profile");
  return c.json(updatedUser);
};

const deleteUserController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  await removeUser(id);
  return c.json({ message: "User deleted successfully" });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUserController,
  deleteUserController
 }
