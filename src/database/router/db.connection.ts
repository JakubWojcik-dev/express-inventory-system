import { MongoClient } from "mongodb";
import "dotenv/config";

const client: MongoClient = new MongoClient(
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_DOCKER_URL!
    : process.env.DATABASE_LOCAL_URL!
);

const connectToDb = async () => {
  try {
    await client.connect();

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
export default connectToDb;

export const closeConnectionOnExit = (connection: MongoClient) => {
  process.on("SIGINT", async () => {
    console.log("Closing MongoDB connection...");
    await connection.close();
    process.exit(1);
  });
};
