export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public cellphone: string,
    public password: string,
    public postalCode: string,
    public street: string,
    public neighborhood: string,
    public houseNumber: number,
    public user_id: number,
    public token: string,
    public administrator: boolean,
  ) {}
}
