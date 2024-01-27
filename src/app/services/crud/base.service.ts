import { HttpClient} from "@angular/common/http";
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
    route: string
  ) {
    this.http = http;
    this.localStorage = localStorage;
    this.route = environment.api + route;
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
    return lastValueFrom(this.http.post<LvApi<T>>(this.route, model))
     .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public updateProduct(model: BaseModel, id: number): Promise<T> {
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
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
