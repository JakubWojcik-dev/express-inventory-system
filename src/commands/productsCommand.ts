import { Response, Router } from "express";
import { Request } from "express";
import { validationResult } from "express-validator";
import {
  validateDeleteProducts,
  validateProductsData,
  validateUpdatedProductData,
} from "../helpers/validateProductsData";
import { Db, ObjectId } from "mongodb";
import { IProducts } from "../types/products";
import isJson from "../helpers/isJson";
import { pick } from "lodash";
const productCommandRouter: Router = Router();

productCommandRouter.post(
  "/",
  validateProductsData({
    isOrder: false,
  }),
  async (req: Request, res: Response): Promise<void> => {
    if (!isJson(req)) {
      res.status(400).json({
        message: "Input data must be JSON type",
      });
      return;
    }

    const errorResults = validationResult(req);

    if (!errorResults.isEmpty()) {
      res.status(422).json({ msg: "Error, invalid input data", errorResults });
      return;
    }

    const { name, description, price, stock }: IProducts = req.body;

    try {
      const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

      const result = await dbConnection
        ?.collection(process.env.PRODUCTS_COLLECTION_NAME!)
        .insertOne({ name, description, price, stock });

      res.status(201).json({
        message: "Success",
        result,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
      return;
    }
  }
);

productCommandRouter.put(
  "/",
  validateUpdatedProductData(),
  async (req: Request, res: Response): Promise<void> => {
    const errorResults = validationResult(req);
    if (!errorResults.isEmpty()) {
      res.status(422).json({ msg: "Error, invalid input data", errorResults });
      return;
    }
    const requestValues = pick(req.body, [
      "_id",
      "name",
      "description",
      "stock",
      "price",
    ]);

    try {
      const productId: string = requestValues._id;
      const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

      const result = await dbConnection
        .collection(process.env.PRODUCTS_COLLECTION_NAME!)
        .updateOne({ _id: new ObjectId(productId) }, { $set: requestValues });

      if (result.matchedCount === 0) {
        res
          .status(404)
          .json({ message: `Product with id ${productId} not found` });
      }
      res.status(200).json({ message: "Product updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product" });
      return;
    }
  }
);

productCommandRouter.delete(
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
        .collection("Products")
        .deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: `Product with id ${_id} not found` });
      }
      res.status(200).json({ message: "Product deleted successfully" });
      return;
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Error deleting product" });
      return;
    }
  }
);

export default productCommandRouter;
