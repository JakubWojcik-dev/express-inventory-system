import { Response, Router } from "express";
import { Request } from "express";
import { validationResult } from "express-validator";
import { Db } from "mongodb";
import isJson from "../helpers/isJson";
import { validateStockData } from "../helpers/validateStockData";
import { updateProductStock } from "../helpers/updateStock";
import "dotenv/config";
const stockCommandRouter = Router();

stockCommandRouter.post(
  "/:id/restock",
  validateStockData,
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

    const id: string = req.params.id;
    const stock: number = req.body.stock;
    const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

    const { status, message } = await updateProductStock(
      id,
      stock,
      dbConnection,
      true
    );
    res.status(status).json(message);
  }
);

stockCommandRouter.post(
  "/:id/sell",
  validateStockData,
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

    const id: string = req.params.id;
    const stock: number = req.body.stock;
    const dbConnection: Db = req.db?.db(process.env.DATABASE_NAME)!;

    const { status, message } = await updateProductStock(
      id,
      stock,
      dbConnection,
      false
    );
    res.status(status).json(message);
  }
);

export default stockCommandRouter;
