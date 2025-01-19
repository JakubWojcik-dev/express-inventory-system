import { Response, Router } from "express";
import { Request } from "express";

import { validationResult } from "express-validator";
import { validateProductsData } from "../helpers/validateProductsData";
import { Db } from "mongodb";
import { IProducts } from "../types/products";
import isJson from "../helpers/isJson";
const productCommandRouter = Router();

productCommandRouter.use(
  "/",
  validateProductsData,
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /product called");
    if (!isJson(req)) {
      res.status(400).json({
        message: "Input data must be JSON type",
      });
      return;
    }
    const errorResults = validationResult(req);

    if (!errorResults.isEmpty()) {
      res.status(400).json({ msg: "Error, invalid input data", errorResults });
      return;
    }

    const { name, description, price, stock }: IProducts = req.body;

    try {
      const dbConnection: Db = req.db!;

      const result = await dbConnection
        ?.collection("Products")
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

export default productCommandRouter;
