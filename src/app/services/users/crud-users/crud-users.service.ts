
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { User } from "src/app/interfaces/user.interface";
import { BaseModel } from "src/app/models/base-model";
import { environment } from "src/environments/environment";

export abstract class CrudUsersService<T extends BaseModel> {
  http!: HttpClient;
  localStorage!: LocalStorageService;
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
      'token': userToken,
    });

    return headers;
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

  public handleResponse(response: BaseAPI<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
