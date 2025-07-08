import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudPaymentsService } from './crud-payments/crud-payments.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends CrudPaymentsService{

  constructor(httpClient: HttpClient) {
    super(httpClient, '/payments');
  }
}
