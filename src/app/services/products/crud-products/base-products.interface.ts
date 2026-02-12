import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { Product } from "src/app/interfaces/product.interface";

export interface BaseProduct<T extends BaseCrud> {
  success: boolean,
  products: {
    docs: Product[]
  }
};
