import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseModel } from "src/app/models/base-model";
import { environment } from "src/environments/environment";

interface LvApi<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean
}

export abstract class BaseService<T extends BaseModel> {
  http!: HttpClient;
  localStorage!: LocalStorageService;
  route!: string;

  constructor(
    http: HttpClient,
    localStorage: LocalStorageService,
    route: string,
  ) {
    this.http = http;
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

  public getProduct(id: number): Promise<T>{
    return lastValueFrom(this.http.get<LvApi<T>>(`${this.route}/${id}`))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public getProducts(): Promise<T>{
    return lastValueFrom(this.http.get<LvApi<T>>(this.route))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public createProduct(model: BaseModel): Promise<T> {
    let header = this.buildHeader();

    console.log('Model: ', model);
    console.log('Token: ', header);


    return lastValueFrom(this.http.post<LvApi<T>>(this.route, model, { headers: header }))
     .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public updateProduct(model: BaseModel, id: number): Promise<T> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.put<LvApi<T>>(`${this.route}/${id}`, model, { headers: header }))
      .then((result) => {
        return this.handleResponse(result) as T;
      });
  }

  public delete(id: number): Promise<boolean> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.delete<LvApi<T>>(`${this.route}/${id}`, { headers: header }))
      .then((result) => {
        return this.handleResponse(result) as true;
      });
  }

  public handleResponse(response: LvApi<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
