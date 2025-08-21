import { Product } from 'src/app/interfaces/product.interface';
import { Shipping } from './shipping.interface';

export interface Sale {
  _id?: number;
  products?: Product[];
  userProfile?: {
    _id?: number,
    name?: string,
    email?: string,
    cellphone?: string,
  };
  shipping?: Shipping;
  sold?: boolean;
  productsQuantity?: number;
  finalValue?: number;
}
