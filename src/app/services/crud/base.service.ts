import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseModel } from "src/app/models/base-model";
import { environment } from "src/environments/environment";

interface LvApi<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean | FormData
};

export abstract class BaseService<T extends BaseModel> {
  http!: HttpClient;
  localStorage!: LocalStorageService;
  route!: string;
  header: any = this.buildHeader();

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
    const token = localStorage.getItem('session');
    const headers = new HttpHeaders({
      token: `Bearer ${token}`,
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

  public createProduct(model: FormData): Promise<T> {
    return lastValueFrom(this.http.post<LvApi<T>>(this.route, model, { headers: this.header }))
     .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public updateProduct(model: FormData, productId: number | undefined): Promise<T> {
    return lastValueFrom(this.http.put<LvApi<T>>(`${this.route}/${productId}`, model, { headers: this.header }))
      .then(result => {

        return this.handleResponse(result) as T;
      })
      .catch (error => {
        return this.handleResponse(error) as T;
      })
  }

  public deleteProduct(productId: number): Promise<boolean> {
    return lastValueFrom(this.http.delete<LvApi<T>>(`${this.route}/${productId}`, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as true;
      });
  }

  public saveCart(product: FormData): Promise<T> {
    return lastValueFrom(this.http.put<LvApi<T>>(`${this.route}/save_cart`, product, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch(error => {
        return this.handleResponse(error) as T;
      })
  }


  public clearCart(userId: number): Promise<T> {
    return lastValueFrom(this.http.put<LvApi<T>>(`${this.route}/clear_cart`, { user_id: userId }, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch(error => {
        return this.handleResponse(error) as T;
      })
  }

  public buyProduct(): string {
    return 'comprou';
  }

  public handleResponse(response: LvApi<T>) {
    if(response) {

      console.log('response: ', response);


      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
