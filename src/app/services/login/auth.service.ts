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

  authUser(user: UserModel): Promise<UserModel> {
    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        console.log(result);

        return result;
      });
  }

  createUser(user: UserModel): void {
    alert("em teste")
    //post
    console.log("usurio sendo passado para o service: ", user);
  }

  authedUserWithSuccess(): boolean {
    return this.authedUser;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
