import { createApp } from "./app.js";
import { connectToDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedProductsIfEmpty } from "./seed/seedProducts.js";

const app = createApp();
let memoryServer;

async function resolveDatabaseUri() {
  if (!env.useInMemoryDb) {
    return env.mongodbUri;
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create();
  return memoryServer.getUri();
}

async function startServer() {
  try {
    const databaseUri = await resolveDatabaseUri();
    try {
      await connectToDatabase(databaseUri);
      await seedProductsIfEmpty();
      console.log("Connected to database successfully");
    } catch (dbError) {
      console.warn("Database connection failed, using fallback products:", dbError.message);
    }

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

async function shutdown() {
  if (memoryServer) {
    await memoryServer.stop();
  }
}

process.on("SIGINT", async () => {
  await shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await shutdown();
  process.exit(0);
});
