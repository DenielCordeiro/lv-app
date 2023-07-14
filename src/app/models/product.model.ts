export class ProductModel {

  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public valor?: number,
    public type?: string,
    public group?: string
  ) {}
}
