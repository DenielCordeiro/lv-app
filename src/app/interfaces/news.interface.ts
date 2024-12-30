export interface News {
  _id?: number,
  type?: String,
  linkProduct?: String,
  file?: {
    name?: String,
    size?: Number,
    key?: String,
    url?: String,
    createdAt?: {
      type?: Date,
      default?: Date,
    },
  },
}
