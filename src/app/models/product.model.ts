export class ProductModel {

  constructor(
    public id?: number,
    public user?: number,
    public name?: string,
    public description?: string,
    public valor?: number,
    public type?: string,
    public groups?: string,
    public selection?: boolean,
    public image?: {
      name?: string,
      size?: number,
      url?: string,
      createdAt?: {
        type?: Date,
        default?: Date
      }
    }

  ) {}
}
