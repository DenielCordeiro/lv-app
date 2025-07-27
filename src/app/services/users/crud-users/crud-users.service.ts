
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { Address } from "src/app/interfaces/address.interface";
import { User } from "src/app/interfaces/user.interface";
import { environment } from "src/environments/environment";

export abstract class CrudUsersService<T extends BaseCrud> {
  modalService!: NgbModal;
  http!: HttpClient;
  localStorage!: LocalStorageService;
  authedUser: boolean = false;
  route!: String;

  constructor(
    httpClient: HttpClient,
    localStorage: LocalStorageService,
    route: string,
  ) {
    this.http = httpClient;
    this.localStorage = localStorage;
    this.route = environment.api + route;
  }

  public buildHeader(): HttpHeaders {
    let userToken = JSON.stringify(localStorage.getItem('session'));
    let headers = new HttpHeaders({
      token: userToken,
    });

    return headers;
  }

  public async authUser(user: User): Promise<User | null> {
    try {
      const result = await lastValueFrom(
        this.http.post<BaseAPI<User>>(`${environment.api}/session/`, user)
      );

      if (result && result.data && typeof result.data === 'object' && 'administrator' in result.data && 'token' in result.data) {
        const administrator = JSON.stringify(result.data.administrator);
        const token = JSON.stringify(result.data.token);
        const profile = JSON.stringify(result.data);

        localStorage.setItem('session', token);
        localStorage.setItem('administrator', administrator);
        localStorage.setItem('profile', profile);

        this.closeModal();

        return this.handleResponse(result as BaseAPI<User>) as User;
      } else {
        alert('[ERRO!]: Dados de usuário inválidos recebidos!');
        return null;
      }
    } catch (error) {
      alert('[ERRO!]: Não foi possível fazer login! Lembre-se de Fazer cadastro, antes de fazer login!');
      return null;
    }
  }

  public authedUserWithSuccess(): boolean {
    if(localStorage.getItem('session')) {
      this.authedUser = true;
    }

    return this.authedUser;
  }

  public isAdministrator(): boolean {
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

  public logout(): boolean {
    localStorage.clear();
    console.log('Você saiu de sua conta!');

    return true;
  }

  public createUser(user: User): Promise<T> {
    return lastValueFrom(this.http.post<BaseAPI<T>>(`${this.route}`, user))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public getProfile(user_id: number): Promise<T> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<BaseAPI<T>>(`${this.route}/${user_id}`, { headers: header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch( error => {
        alert('Não foi possível retornar dados de seu perfil!')
        return error;
      })
  }

  public searchPostalCode(postalCode: number): Promise<Address> {
    return lastValueFrom(this.http.get<Address>(`${environment.viaCepAPI}/${postalCode}/json`))
      .then(result => {
        return result;
      })
      .catch(error => {
        alert('[ERRO]: não foi possível dados deste CEP')
        return error;
      })
  }

  public handleResponse(response: BaseAPI<User>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }
}
