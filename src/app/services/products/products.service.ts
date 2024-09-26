import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { BaseService } from '../crud/base.service';
import { ProductModel } from '../../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<ProductModel> {

  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService,
  ) {
    super(httpClient, localStorageService, '/products');
  }
}
