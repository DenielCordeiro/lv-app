export interface Shipping {
  _id: number,
  company?: {
    id?: number,
    name?: string,
    picture?: string,
  },
  name?: string,
  price?: number,
  postalCode?: number,
}
