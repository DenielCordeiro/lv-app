import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authedUser: boolean = false;

  constructor() { }

  authUser(user: UserModel): void {
    if(user.email === "dcordeiro962@gmail.com" && user.password === "123") {
      this.authedUser = true;
    } else {
      this.authedUser = false;
    }
  }

  authedUserWithSuccess(): boolean {
    return this.authedUser;
  }
}
