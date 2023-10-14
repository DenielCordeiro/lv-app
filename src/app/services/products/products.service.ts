import { ProductModel } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BaseService } from '../crud/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<ProductModel> {
  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService
  ) {
    super(httpClient, localStorageService, '/products');
  }
}
