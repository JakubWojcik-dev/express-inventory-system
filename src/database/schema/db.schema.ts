import { Db, MongoClient } from "mongodb";
import "dotenv/config";

const client: MongoClient = new MongoClient(
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_DOCKER_URL!
    : process.env.DATABASE_LOCAL_URL!
);

const databaseConnection = async () => {
  try {
    await client.connect();

    console.log("Connected to DB");
    const dataBase: Db = client.db(process.env.DATABASE_NAME);

    await dataBase
      .createCollection(process.env.PRODUCTS_COLLECTION_NAME!)
      .catch(() => {
        console.log("Products collection already exists");
      });

    await dataBase
      .createCollection(process.env.ORDERS_COLLECTION_NAME!)
      .catch(() => {
        console.log("Orders collection already exists");
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default databaseConnection;
