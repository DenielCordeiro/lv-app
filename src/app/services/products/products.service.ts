import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() {}

  getProducts() {
    console.log("trazendo todos os produtos!");
  }

  getProduct(id: number) {
    console.log("trazendo um unico produto selecionado! ", id);
  }

  createProduct(product: ProductModel) {
    console.log("você criou o produto: ", product);
  }

  updateProduct(id: number, product: ProductModel) {
    console.log("você atualizou o id: ", id, "para: ", product);
  }

  deleteProduct(id: number) {
    console.log("Você excluiu o id: ", id);
  }
}
