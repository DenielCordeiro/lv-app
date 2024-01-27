import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  ) { }

  public buildHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'token': environment.token,
      'administator': environment.administrator,
    });

    return headers;
  }


  authUser(user: UserModel): Promise<UserModel> {
    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        localStorage.setItem('session', result.token);
        environment.token = result.token;
        environment.administrator = JSON.stringify(result.administrator);

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
        console.log('usuário criado: ', result);

        this.closeModal();

        return result;
      });
  }

  getProfile(id: number): Promise<UserModel> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<UserModel>(`${environment.api}/profile/${id}`, { headers: header }))
      .then(result => {
        console.log('Dados do Usuário: ', result);


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
      alert('Necessário Fazer Login')
    }

    return this.authedUser;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
