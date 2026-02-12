import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { lastValueFrom } from "rxjs";
import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { environment } from "src/environments/environment";
import { Product } from './../../../interfaces/product.interface';
import { BaseProduct } from "./base-products.interface";

export abstract class CrudProductsService<T extends BaseCrud> {
  http!: HttpClient;
  localStorage!: LocalStorageService;
  route!: string;
  header: any = this.buildHeader();
  products: Product[] = [];

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

  public getProducts(): Promise<BaseProduct<T>>{
    return lastValueFrom(this.http.get<BaseProduct<T>>(this.route))
      .then(products => {
        return this.handleResponse(products) as unknown as BaseProduct<T>;
      });
  }

  public addProductLocalStorage(product: Product): void {
    const productInLocalStorage = localStorage.getItem('selectedProduct');

    if (productInLocalStorage) {
      this.products = JSON.parse(productInLocalStorage);
    } else {
      this.products.push(product);
      localStorage.setItem('selectedProduct', JSON.stringify(this.products));
    }
  }

  public getProduct(): Product {
    const data = localStorage.getItem('selectedProduct');
    this.products = data ? JSON.parse(data) : [];

    return this.products[0];
  }

  public removeProductLocalStorage(productName: string): void {
    this.products.pop();
    localStorage.removeItem(productName);
  }

  public createProduct(model: FormData): Promise<T> {
    return lastValueFrom(this.http.post<BaseProduct<T>>(this.route, model, { headers: this.header }))
      .then(result => {
      return this.handleResponse(result) as unknown as T;
    });
  }

  public updateProduct(model: FormData, productId: number | undefined): Promise<T> {
    return lastValueFrom(this.http.put<BaseProduct<T>>(`${this.route}/${productId}`, model, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as unknown as T;
      })
      .catch (error => {
        return this.handleResponse(error) as unknown as T;
      })
  }

  public deleteProduct(productId: string): Promise<boolean> {
    return lastValueFrom(this.http.delete<BaseProduct<T>>(`${this.route}/${productId}`, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as unknown as true;
      });
  }

  public handleResponse(response: BaseProduct<T>) {
    if(response) {
      return response;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
