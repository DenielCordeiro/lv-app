import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseModel } from "src/app/models/base-model";

interface LvApi<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean
}

export abstract class BaseService<T extends BaseModel> {
  http!: HttpClient;
  // localStorage!: LocalStorageService
  route: string  = '';

  constructor(
    http: HttpClient,
    // localStorage: LocalStorageService
    route: string
  ) {
    this.http = http;
    // this.localStorage = localStorage;
    // this.route = environment.api + route
  }

  // public buildHeader(): HttpHeaders {
  //   let token = this.localStorage.retrieve('token');

  //   let headers = new HttpHeaders({
  //     'business-app': environment.businessApp,
  //     'company': environment.company,
  //     'firebase': token,
  //     'refresh': environment.refresh
  //   })

  //   return headers;
  // }

  // public getResources(): Promise<T> {
  //   let header = this.buildHeader();

  //   return lastValueFrom(this.http.get<LvApi<T>>(this.route, { headers: header }))
  //     .then(result => {
  //       return this.handleResponse(result) as T;
  //     });
  // }

  public getResource(id: number): Promise<T> {
    return lastValueFrom(this.http.get<LvApi<T>>(`${this.route}/${id}`))
      .then(result=> {
        return this.handleResponse(result) as T;
      });
  }

  public createResource(model: BaseModel): Promise<T> {
    return lastValueFrom(this.http.post<LvApi<T>>(this.route, model))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public updateResource(model: BaseModel, id: number): Promise<T> {
    return lastValueFrom(this.http.put<LvApi<T>>(`${this.route}/${id}`, model))
      .then((result) => {
        return this.handleResponse(result) as T;
      });
  }

  public delete(id: number): Promise<boolean> {
    return lastValueFrom(this.http.delete<LvApi<T>>(`${this.route}/${id}`))
      .then((result) => {
        return this.handleResponse(result) as true;
      });
  }

  public handleResponse(response: LvApi<T>) {
    if(response.success) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso");
    }
  }
}
