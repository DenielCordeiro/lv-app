export class ProductModel {

  constructor(
    public id?: number,
    public user?: number,
    public name?: string,
    public description?: string,
    public valor?: number,
    public type?: string,
    public groups?: string,
    public image_url?: string,
    public selection?: boolean,
  ) {}
}
