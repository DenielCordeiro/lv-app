import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() {}

  getProducts() {
    console.log("trazendo todos os produtos!");
  }

  getProduct(id: number) {
    console.log("trazendo um unico produto selecionado!");
  }

  updateProduct(id: number) {
    console.log("atualizando um unico item selecionado!");
  }

  deleteProduct(id: number) {
    console.log("deletando um unico item selecionado!");
  }
}
