import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { adminRouter } from "./routes/admin.js";
import { inquiriesRouter } from "./routes/inquiries.js";
import { productsRouter } from "./routes/products.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
    }),
  );
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/products", productsRouter);
  app.use("/api/inquiries", inquiriesRouter);
  app.use("/api/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

