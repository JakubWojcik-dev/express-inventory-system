import "express";
import { MongoClient } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      db?: MongoClient;
    }
  }
}
