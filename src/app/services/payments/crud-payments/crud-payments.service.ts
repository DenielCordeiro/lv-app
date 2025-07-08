import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudPaymentsService {
  http!: HttpClient;
  baseUrl!: string;


  constructor(httpClient: HttpClient, route: string) {
    this.http = httpClient;
    this.baseUrl = environment.api + route;
  }
}
