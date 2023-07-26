export class UserModel {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public address: string,
  ) {}
}
