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
    public route: Router
  ) { }

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


  authUser(user: UserModel): Promise<UserModel> {
    let administrator;
    let userId;

    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        administrator = JSON.stringify(result.administrator);
        userId = JSON.stringify(result.user_id);

        localStorage.setItem('session', result.token);
        localStorage.setItem('administrator', administrator);
        localStorage.setItem('user_id', userId);

        this.closeModal();

        return result;
      })
      .catch(error => {
        alert('[ERRO!]: Não foi possível fazer login!' + " " + 'Lembre-se de Fazer cadastro, antes de fazer login!')
        return error;
      })
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

  authedUserWithSuccess(): boolean {
    if(localStorage.getItem('session')) {
      this.authedUser = true;
    } else {
      alert('Necessário Fazer Login');
      this.route.navigateByUrl('/newsletter');
    }

    return this.authedUser;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  isAdministrator(): boolean {
    let administrartor: string | null = localStorage.getItem('administrator');
    let isAdm: boolean = false;

    if (administrartor !== null) {

      if (administrartor == 'true') {
        isAdm = true;
      } else {
        isAdm = false;
      }

    } else {
      isAdm = false;
    }

    return isAdm;
  }

  logout(): boolean {
    localStorage.clear();
    console.log('Você saiu de sua conta!');

    return true;
  }
}
