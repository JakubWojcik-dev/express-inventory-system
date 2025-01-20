import { NextFunction, Response, Router } from "express";
import { Request } from "express";
import { Db } from "mongodb";
import "dotenv/config";
const productsQueriesRouter = Router();

productsQueriesRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

    try {
      const data = await dbConnection
        ?.collection(process.env.PRODUCTS_COLLECTION_NAME!)
        .find({})
        .toArray();
      res.status(200).json({
        products: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error while fetching products", error });
    }
    next();
  }
);

export default productsQueriesRouter;
