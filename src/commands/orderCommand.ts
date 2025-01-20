import { Router, Request, Response } from "express";
import { IProducts } from "../types/products";
import {
  validateDeleteProducts,
  validateProductsData,
} from "../helpers/validateProductsData";
import { validationResult } from "express-validator";
import { ClientSession, Db, MongoClient, ObjectId } from "mongodb";
import { checkProductsStock } from "../helpers/checkProductsStock";
import "dotenv/config";
const orderCommandRouter = Router();

orderCommandRouter.post(
  "/",
  validateProductsData({ isOrder: true }),
  async (req: Request, res: Response): Promise<void> => {
    const { customerId, products } = req.body;
    const connection: MongoClient = req.db!;
    const session: ClientSession = connection.startSession();
    const dbConnection = connection.db(process.env.DATABASE_NAME);

    const errorResults = validationResult(req);

    if (!errorResults.isEmpty()) {
      res.status(422).json({ msg: "Error, invalid input data", errorResults });
      return;
    }

    try {
      session.startTransaction();

      const updatedProductsID = products.map(
        (item: IProducts) => new ObjectId(item._id)
      );
      const fetchProductsFromDB = await dbConnection
        .collection("Products")
        .find({ _id: { $in: updatedProductsID } })
        .toArray();

      if (products.length !== fetchProductsFromDB.length) {
        res
          .status(400)
          .json({ msg: "One or more products do not exist in the database." });
        return;
      }
      const { status, error } = checkProductsStock(
        products,
        fetchProductsFromDB
      );

      if (status === 422) {
        res.status(status).json(error);
        return;
      }

      const result = await dbConnection
        ?.collection(process.env.ORDERS_COLLECTION_NAME!)
        .insertOne({ customerId: customerId, products: products });

      await session.commitTransaction();
      res.status(201).json({
        message: "Success",
        result,
      });

      return;
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: "Error creating order", error });
      return;
    } finally {
      await session.endSession();
    }
  }
);

orderCommandRouter.delete(
  "/",
  validateDeleteProducts(),
  async (req: Request, res: Response): Promise<void> => {
    const errorResults = validationResult(req);
    if (!errorResults.isEmpty()) {
      res.status(422).json({ msg: "Error, invalid input data", errorResults });
      return;
    }
    const _id: string = req.body._id;

    try {
      const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

      const result = await dbConnection
        .collection(process.env.ORDERS_COLLECTION_NAME!)
        .deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: `Order with id ${_id} not found` });
      }
      res.status(200).json({ message: "Order deleted successfully" });
      return;
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Error deleting order" });
      return;
    }
  }
);
export default orderCommandRouter;
