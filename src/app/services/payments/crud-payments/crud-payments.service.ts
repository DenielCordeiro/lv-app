import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseAPI } from 'src/app/interfaces/base-api.interface';
import { BaseCrud } from 'src/app/interfaces/base-crud.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudPaymentsService<T extends BaseCrud> {
  http!: HttpClient;
  baseUrl!: string;
  header: any = this.buildHeader();

  constructor(httpClient: HttpClient, route: string) {
    this.http = httpClient;
    this.baseUrl = environment.api + route;
  }

   public buildHeader(): HttpHeaders {
    const token = localStorage.getItem('session');
    const headers = new HttpHeaders({
      token: `Bearer ${token}`,
    });

    return headers;
  }

  public createPaymentPIX(payment: Product): Promise<T> {
    return lastValueFrom(this.http.post<BaseAPI<T>>(`${this.baseUrl}/PIX`, payment, { headers: this.header }))
      .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public createPaymentBankSlip(payment: Product): Promise<T> {
     return lastValueFrom(this.http.post<BaseAPI<T>>(`${this.baseUrl}/bankSlip`, payment, { headers: this.header }))
      .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public createPaymentCreditCard(payment: Product): Promise<T> {
     return lastValueFrom(this.http.post<BaseAPI<T>>(`${this.baseUrl}/creditCard`, payment, { headers: this.header }))
      .then(result => {
      return this.handleResponse(result) as T;
    });
  }

  public handleResponse(response: BaseAPI<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
