import { NextFunction, Response, Router } from "express";
import { Request } from "express";
import "dotenv/config";
import { Db } from "mongodb";

const orderQueriesRouter = Router();

orderQueriesRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

    try {
      const data = await dbConnection
        ?.collection(process.env.ORDERS_COLLECTION_NAME!)
        .find({})
        .toArray();
      res.status(200).json({
        orders: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error while fetching orders", error });
    }
    next();
  }
);

export default orderQueriesRouter;
