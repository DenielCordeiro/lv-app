export interface News {
  _id?: number,
  type?: String,
  linkProduct?: String,
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
