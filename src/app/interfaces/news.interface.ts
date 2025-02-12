export interface News {
  _id?: number,
  type?: string,
  linkProduct?: string,
  file?: {
    name?: string,
    size?: number,
    url?: string,
    createdAt?: {
      type?: Date,
      default?: Date
    }
  },
}
