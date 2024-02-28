import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from "rxjs";
import { LocalStorageService } from 'ngx-webstorage';
import { UserModel } from 'src/app/models/user.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService,
    private modalService: NgbModal,
    public http: HttpClient,
  ) {}

  public buildHeader(): HttpHeaders {
    let userToken = JSON.stringify(localStorage.getItem('session'));
    let headers = new HttpHeaders({
      'token': userToken,
    });

    return headers;
  }

  createUser(user: UserModel): Promise<UserModel> {
    return lastValueFrom(this.http.post<UserModel>(`${environment.api}/profile`, user))
      .then(result => {
        this.closeModal();

        return result;
      });
  }

  getProfile(user_id: number): Promise<UserModel> {
    let header = this.buildHeader();
    console.log(header);


    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/profile/${user_id}`, { headers: header }))
      .then(result => {
        return result;
      })
      .catch( error => {
        alert('Não foi possível retornar dados de seu perfil!')
        return error;
      })
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
