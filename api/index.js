import { createApp } from "../server/src/app.js";
import { connectToDatabase } from "../server/src/config/db.js";
import { env } from "../server/src/config/env.js";
import { seedProductsIfEmpty } from "../server/src/seed/seedProducts.js";

const app = createApp();
let bootstrapPromise;

async function bootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await connectToDatabase(env.mongodbUri);
      await seedProductsIfEmpty();
    })().catch((error) => {
      bootstrapPromise = undefined;
      throw error;
    });
  }

  await bootstrapPromise;
}

export default async function handler(req, res) {
  await bootstrap();
  return app(req, res);
}
