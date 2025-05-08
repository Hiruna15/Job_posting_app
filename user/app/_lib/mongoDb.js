import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

let mongooseConnection = null;
let mongoClient = null;

export async function connectMongoose() {
  if (!mongooseConnection) {
    mongooseConnection = await mongoose.connect(
      process.env.MONGO_URI,
      clientOptions
    );
  }
}

export async function getMongoClient() {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
  }
  return mongoClient;
}
