import { IProducts } from "../types/products";

export const checkProductsStock = (
  products: IProducts[],
  fetchedProducts: any
): { status: number; error?: string[] } => {
  const mss = [];
  for (const item of products) {
    const product = fetchedProducts.find(
      (i: IProducts) => i._id?.toString() === item._id
    );
    if (!product) {
      mss.push(`Product with ID ${item._id} does not exist.`);
    }

    if (product.stock - item.stock < 0) {
      mss.push(`Stock for product with ID ${item._id} cannot go below zero.`);
    }
  }
  return mss.length > 0 ? { status: 422, error: mss } : { status: 200 };
};
