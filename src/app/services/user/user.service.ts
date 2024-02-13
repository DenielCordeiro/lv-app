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
    let userToken = localStorage.getItem('session');

    if (userToken !== null) {
      environment.token = userToken;
    } else {
      console.log('não existe token, para salver nas variaveis de ambiente!');
    }

    let headers = new HttpHeaders({
      'token': environment.token,
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

  getProfile(id: number): Promise<UserModel> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/profile/${id}`, { headers: header }))
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
