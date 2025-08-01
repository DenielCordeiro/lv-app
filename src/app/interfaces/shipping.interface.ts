export interface Shipping {
  company?: {
    id?: number,
    name?: string,
    picture?: string,
  },
  name?: string,
  price?: number,
  postalCode?: number,
}
