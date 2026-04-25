import jwt from "jsonwebtoken";

export function generateToken(payload, secret) {
  return jwt.sign(payload, secret, { expiresIn: "12h" });
}

