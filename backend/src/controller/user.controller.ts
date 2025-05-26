import { createUser, findUsers, findUserById, findUserByEmail, updateUser, removeUser } from "../model/user.model.ts";
import { logActivity } from "../model/activitylog.model.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.ts";

const registerUser = async (c: any) => {
  try {
    const { firstname, lastname, email, password, role } = await c.req.json();

    const existing = await findUserByEmail(email);
    if (existing) {
      return c.json({ error: "Email already exists" }, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ firstname, lastname, email, password: hashedPassword, role });
    await logActivity(user.id, "User registered");
    return c.json(user);
  } catch (err) {
    console.error("Register Error:", err);
    return c.json({ error: "Registration failed" }, 500);
  }
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

const getCurrentUser = async (c: any) => {
  const payload = c.get("user"); 
  const user = await findUserById(payload.id); 
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user); 
};

const getUserByEmailController = async (c: any) => {
  const email = c.req.param("email");
  const user = await findUserByEmail(email);
  if (!user) return c.json({ error: "Not found" }, 404);
  return c.json(user);
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
  getCurrentUser,
  updateUserController,
  deleteUserController,
  getUserByEmailController,
 }
