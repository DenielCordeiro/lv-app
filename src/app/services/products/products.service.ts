import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { CrudProductsService } from './crud-products/crud-products.service';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends CrudProductsService<Product> {

  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService,
  ) {
    super(httpClient, localStorageService, '/products');
  }
}
