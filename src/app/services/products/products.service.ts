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
    console.log("aqui está o id do produto meu nobre: ", id);
  }

  createProduct(product: ProductModel) {
    console.log("você criou um produto chefe: ", product);
  }

  updateProduct(id: number, product: ProductModel) {
    console.log("ai sim guerreiro, você atualizou o id: ", id, "para: ", product);
  }

  deleteProduct(id: number) {
    console.log("Vishhh!, você excluiu um produto com o seguite o id: ", id);
  }
}
