import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudPaymentsService } from './crud-payments/crud-payments.service';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends CrudPaymentsService<Product>{
  constructor(httpClient: HttpClient) {
    super(httpClient, '/payments');
  }
}
