import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from "rxjs";
import { User } from 'src/app/interfaces/user.interface';
import { ResidenceModel } from 'src/app/models/residence.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public authedUser: boolean = false;

  constructor(
    public http: HttpClient,
    private modalService: NgbModal,
    public route: Router
  ) { }

  public buildHeader(): HttpHeaders {
    let session = localStorage.getItem('session');
    let userToken = JSON.stringify(session);

    let headers = new HttpHeaders({
      token: userToken,
    });

    return headers;
  }


  authUser(user: User): Promise<User> {
    let administrator;
    let userId;

    return lastValueFrom(this.http.get<User>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        administrator = JSON.stringify(result.administrator);
        userId = JSON.stringify(result.user_id);

        const token = String(result.token);

        localStorage.setItem('session', token);
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

  createUser(user: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(`${environment.api}/profile`, user))
      .then(result => {
        this.route.navigateByUrl('/newsletter')

        return result;
      });
  }

  getProfile(id: number): Promise<User> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<User>(`${environment.api}/profile/${id}`, { headers: header }))
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

  searchPostalCode(postalCode: number): Promise<ResidenceModel> {
    return lastValueFrom(this.http.get<ResidenceModel>(`${environment.viaCepAPI}/${postalCode}/json`))
      .then(result => {
        return result;
      })
      .catch(error => {
        alert('[ERRO]: não foi possível dados deste CEP')
        return error;
      })
  }
}
