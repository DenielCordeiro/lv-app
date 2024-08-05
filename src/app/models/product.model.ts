export class ProductModel {

  constructor(
    public id?: number,
    public user?: number,
    public saleUser?: string,
    public name?: string,
    public description?: string,
    public valor?: number,
    public type?: string,
    public groups?: string,
    public selection?: boolean,
    public file?: {
      file?: File,
      name?: string,
      size?: number,
      url?: string,
      createdAt?: {
        type?: Date,
        default?: Date
      }
    },
    public shipping?: {
      name?: string,
      price?: number,
      postalCode?: number,
    }
  ) {}
}
