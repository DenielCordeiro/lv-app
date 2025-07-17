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
  }
}
