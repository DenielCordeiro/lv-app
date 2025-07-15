import { User } from "./user.interface"

export interface Product {
  _id?: number,
  name?: string,
  description?: string,
  valor?: number,
  type?: string,
  groups?: string,
  selection?: boolean,
  file?: {
    name?: string,
    size?: number,
    url?: string,
    createdAt?: {
      type?: Date,
      default?: Date
    }
  },
  shipping?: {
    name?: string,
    price?: number,
    postalCode?: number,
  },
  sale?: {
    sold: boolean,
    productsQuantity?: number,
    userId: number,
    finalValue?: number,
    user?: User,
  },
}
