import { Component } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  productChecked: boolean = false;
  productId: number | undefined;

  items: ProductModel[] = [
    {
      "id": 1,
      "name": "Colar azul",
      "description": "test",
      "valor": 25.5,
      "type": "colar",
      "collection": "Fim de ano"
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 53.5,
      "type": "Pulseiras",
      "collection": "Zodiaco"
    },
  ];

  constructor(public productsService: ProductsService) {
    this.getingProducts();
  }

  getingProducts() {
    this.productsService.getProducts();
  }

  productSelected(id: number | undefined, event: Event) {
    var eventChecked: any = event;

    if (eventChecked.target?.checked === true) {
      this.productChecked = true;
      this.productId = id;
    } else {
      this.productChecked = false;
      this.productId = undefined;
    }

    console.log("id do produto: ", this.productId);
    console.log("está selecionado? ", this.productChecked);
  }

  updatingProduct(id: number | undefined) {
    if (id !== undefined) {
      console.log("id selecionado", id);
    } else {
      alert("[Erro]: você não selecionou o produto");
    }
  }

  deletingProduct(id: number | undefined) {
    if (id !== undefined) {
      console.log("id selecionado", id);
    } else {
      alert("[Erro]: você não selecionou o produto");
    }
  }
}
