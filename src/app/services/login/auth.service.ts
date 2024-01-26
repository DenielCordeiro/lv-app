import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from "rxjs";
import { UserModel } from 'src/app/models/user.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authedUser: boolean = false;

  constructor(
    public http: HttpClient,
    private modalService: NgbModal,
    private router: Router
  ) { }

  public buildHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'token': environment.token
    })

    return headers;
  }
  // let header = this.buildHeader();

  authUser(user: UserModel, currentPage: string): Promise<UserModel> {
    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        console.log('login: ', result);
        this.router.navigateByUrl(`${environment.api}/${currentPage}`);
        return result;
      })
  }

  createUser(user: UserModel, currentPage: string): Promise<UserModel> {
    return lastValueFrom(this.http.post<UserModel>(`${environment.api}/profile`, user))
      .then(result => {
        console.log('usuário criado: ', result);
        this.router.navigateByUrl(`${environment.api}/${currentPage}`);
        return result;
      });
  }

  authedUserWithSuccess(): boolean {
    return this.authedUser;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
