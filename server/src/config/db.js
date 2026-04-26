import mongoose from "mongoose";

export async function connectToDatabase(mongodbUri) {
  try {
    // Set connection timeout options
    const connectOptions = {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    };

    const connectionPromise = mongoose.connect(mongodbUri, connectOptions);
    
    // Wait for connection with a timeout
    await Promise.race([
      connectionPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout")), 4000)
      )
    ]);
  } catch (error) {
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.warn("Error disconnecting from database:", error.message);
  }
}

