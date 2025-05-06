import { verifyToken } from "../utils/jwt.ts";
import type { MiddlewareHandler } from "hono";

const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
};

export { authMiddleware };