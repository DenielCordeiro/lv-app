
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
    let result: BaseAPI<User>;

    try {
      result = await lastValueFrom(
        this.http.post<BaseAPI<User>>(`${environment.api}/session/`, user)
      );
    } catch (error) {
      console.error('[ERRO HTTP]:', error);
      alert('[ERRO!]: Não foi possível fazer login! Verifique seu usuário e senha!');
      return null;
    }

    try {
      if (result && result.data && typeof result.data === 'object' && 'administrator' in result.data && 'token' in result.data) {
        const profile = JSON.stringify(result.data);
        localStorage.setItem('profile', profile);

        return this.handleResponse(result as BaseAPI<User>) as User;
      } else {
        alert('[ERRO!]: Dados de usuário inválidos recebidos!');
        return null;
      }
    } catch (error) {
      console.error('[ERRO DE PROCESSAMENTO]:', error);
      alert('[ERRO!]: Algo deu errado ao processar os dados!');
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
    let administrartor: string | null = localStorage.getItem('user');
    let profile: User | null = JSON.parse(administrartor || 'null');

    let isAdm: boolean = false;

    if (profile?.administrator !== null) {

      if (profile?.administrator === true) {
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
}
