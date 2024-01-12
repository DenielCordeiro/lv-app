export class ProductModel {

  constructor(
    public id?: number,
    public user_id?: number,
    public name?: string,
    public description?: string,
    public valor?: number,
    public type?: string,
    public group?: string,
    public selection?: boolean,
  ) {}
}
