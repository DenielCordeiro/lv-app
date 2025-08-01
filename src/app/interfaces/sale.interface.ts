import { Product } from 'src/app/interfaces/product.interface';
import { User } from './user.interface';
import { Shipping } from './shipping.interface';

export interface Sale {
  products?: Product[];
  user?: User;
  shipping?: Shipping;
  sold?: boolean;
  productsQuantity?: number;
  finalValue?: number;
}
