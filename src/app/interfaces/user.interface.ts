import { Product } from "./product.interface";

export interface User {
  _id?: number,
  name?: string,
  email?: string,
  cellphone?: string,
  password?: string,
  postalCode?: string,
  state?: string,
  city?: string,
  street?: string,
  neighborhood?: string,
  houseNumber?: number,
  user_id?: number,
  token?: string,
  administrator?: boolean,
  productsCart?: Product
}
