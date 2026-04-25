import { env } from "../config/env.js";
import { generateToken } from "../utils/generateToken.js";

export async function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (username !== env.adminUsername || password !== env.adminPassword) {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }

  const token = generateToken(
    {
      role: "admin",
      username: env.adminUsername,
    },
    env.jwtSecret,
  );

  return res.json({
    token,
    admin: {
      username: env.adminUsername,
    },
  });
}

export async function logoutAdmin(req, res) {
  return res.json({ message: "Logged out successfully." });
}

