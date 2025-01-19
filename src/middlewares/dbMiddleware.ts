import { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";

export const dbMiddleware = (dbConnection: MongoClient) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.db = dbConnection.db("inventoryDatabase")!;
      next();
    } catch (error) {
      console.error("Error in dbMiddleware:", error);
      res.status(500).json({ message: "Database middleware error", error });
    }
  };
};
