import { IProducts } from "./products";

export interface IOrder {
  customerId: string;
  products: IProducts[];
}
