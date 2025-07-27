import { Product } from 'src/app/interfaces/product.interface';
import { User } from './user.interface';

export interface Sale {
  shipping?: {
    name?: string;
    price?: number;
    postalCode?: number;
  }
  sold?: boolean;
  productsQuantity?: number;
  finalValue?: number;
  user?: User;
  products?: Product[];
}
