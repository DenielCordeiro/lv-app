export interface Product {
  _id?: number,
  user?: number,
  saleUser?: string,
  name?: string,
  description?: string,
  valor?: number,
  type?: string,
  groups?: string,
  selection?: boolean,
  file?: {
    file?: File,
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
    userId: number,
  },
}
