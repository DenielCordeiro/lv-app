
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { Address } from "src/app/interfaces/residence.interface";
import { User } from "src/app/interfaces/user.interface";
import { BaseModel } from "src/app/models/base-model";
import { environment } from "src/environments/environment";

export abstract class CrudUsersService<T extends BaseModel> {
  modalService!: NgbModal;
  http!: HttpClient;
  localStorage!: LocalStorageService;
  authedUser: boolean = false;
  route!: String;

  constructor(
    httpClient: HttpClient,
    localStorage: LocalStorageService,
    route: String,
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

  public authUser(user: User): Promise<User> {
    return lastValueFrom(this.http.get<User>(`${environment.api}/session/${user.email}/${user.password}`))
      .then(result => {
        const administrator = JSON.stringify(result.administrator);
        const userId = JSON.stringify(result.user_id);
        const token = JSON.stringify(result.token);

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
    return lastValueFrom(this.http.post<BaseAPI<T>>(`${environment.api}/profile`, user))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public getProfile(user_id: number): Promise<T> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<BaseAPI<T>>(`${environment.api}/profile/${user_id}`, { headers: header }))
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

  public handleResponse(response: BaseAPI<T>) {
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
