export interface News {
  _id?: string,
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
