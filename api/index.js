import { createApp } from "../server/src/app.js";
import { env } from "../server/src/config/env.js";

const app = createApp();

export default async function handler(req, res) {
  // On Vercel, we always use fallback products (no database needed)
  return app(req, res);
}
