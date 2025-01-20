import express from "express";
import "dotenv/config";
import cors from "cors";
import productsCommandRouter from "./commands/productsCommand";
import stockCommand from "./commands/stockCommand";
import connectToDb, {
  closeConnectionOnExit,
} from "./database/router/db.connection";
import { dbMiddleware } from "./middlewares/dbMiddleware";
import productsQueriesRouter from "./queries/productsQueries";
import { MongoClient } from "mongodb";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import orderCommandRouter from "./commands/orderCommand";
import { setupSwagger } from "./swagger";
import orderQueriesRouter from "./queries/ordersQueries";
const app = express();
let dbConnection: MongoClient | undefined;

app.use(cors());
app.use(express.json());
app.use(errorMiddleware());
setupSwagger(app);
const server = async () => {
  try {
    dbConnection = await connectToDb();
    closeConnectionOnExit(dbConnection);
  } catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
  }
  app.use(dbMiddleware(dbConnection));

  app.use("/orders", orderCommandRouter);
  app.use("/orders", orderQueriesRouter);
  app.use("/products", stockCommand);

  app.use("/products", productsCommandRouter);
  app.put("/products", productsCommandRouter);
  app.use("/products", productsQueriesRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
};
server();
