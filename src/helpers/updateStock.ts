import { Db, ObjectId } from "mongodb";
import "dotenv/config";
export const updateProductStock = async (
  id: string,
  stockUpdate: number,
  dbConnection: Db,
  restock: boolean
): Promise<{ status: number; message: string }> => {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        status: 400,
        message: "Invalid product ID format",
      };
    }

    const product = await dbConnection
      ?.collection(process.env.PRODUCTS_COLLECTION_NAME!)
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return { status: 404, message: "Product doesn't exist in db" };
    }
    const stockQuery = restock
      ? { $inc: { stock: stockUpdate } }
      : { $inc: { stock: -stockUpdate } };

    const result = await dbConnection
      ?.collection(process.env.PRODUCTS_COLLECTION_NAME!)
      .updateOne(
        {
          _id: new ObjectId(id),
          stock: { $gte: restock ? 0 : stockUpdate },
        },
        stockQuery
      );

    if (result?.modifiedCount === 0) {
      return { status: 400, message: "Stock cannot go below 0." };
    }

    return { status: 201, message: "Stock updated successfully." };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { status: 500, message: "Error updating stock." };
  }
};
