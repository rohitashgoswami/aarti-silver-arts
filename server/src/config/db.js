import mongoose from "mongoose";

export async function connectToDatabase(mongodbUri) {
  await mongoose.connect(mongodbUri);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

