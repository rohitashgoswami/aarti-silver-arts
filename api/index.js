import { createApp } from "../server/src/app.js";
import { connectToDatabase } from "../server/src/config/db.js";
import { env } from "../server/src/config/env.js";
import { seedProductsIfEmpty } from "../server/src/seed/seedProducts.js";

const app = createApp();
let bootstrapPromise;

async function resolveDatabaseUri() {
  if (!env.useInMemoryDb) {
    return env.mongodbUri;
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const memoryServer = await MongoMemoryServer.create();
  return memoryServer.getUri();
}

async function bootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      try {
        const databaseUri = await resolveDatabaseUri();
        await connectToDatabase(databaseUri);
        await seedProductsIfEmpty();
      } catch (error) {
        console.warn("Database connection failed, using fallback products:", error.message);
      }
    })();
  }

  await bootstrapPromise;
}

export default async function handler(req, res) {
  await bootstrap();
  return app(req, res);
}
