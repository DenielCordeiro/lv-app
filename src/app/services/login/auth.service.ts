import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authedUser: boolean = false;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  authUser(user: UserModel): void {
    if(user.email === "dcordeiro962@gmail.com" && user.password === "123") {
      this.authedUser = true;
      this.router.navigate(["/products"]);
    } else if (user.email === "camila.luzvioleta@gmail.com" && user.password === "123") {
      this.authedUser = true;
      this.router.navigate(["/products"]);
    } else {
      this.authedUser = false;
      alert('E-mail ou Senha está incorreto! [Insira Novamente]');
    }

    if(this.authedUser === true) {
      this.modalService.dismissAll();
    }
  }

  authedUserWithSuccess(): boolean {
    return this.authedUser;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
