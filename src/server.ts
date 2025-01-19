import express from "express";
import "dotenv/config";
import cors from "cors";
import productsCommandRouter from "./commands/productsCommand";
import connectToDb, {
  closeConnectionOnExit,
} from "./database/router/db.connection";
import { dbMiddleware } from "./middlewares/dbMiddleware";
import { MongoClient } from "mongodb";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
let dbConnection: MongoClient | undefined;

app.use(cors());
app.use(express.json());
app.use(errorMiddleware());

const server = async () => {
  try {
    dbConnection = await connectToDb();
    closeConnectionOnExit(dbConnection);
  } catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
  }
  app.use(dbMiddleware(dbConnection));

  app.post("/products", productsCommandRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
};
server();
