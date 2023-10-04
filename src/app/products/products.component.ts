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
  title: string = 'Trabalhos disponíveis';

  items: ProductModel[] = [
    {
      "id": 1,
      "name": "",
      "description": "test",
      "valor": 25.5,
      "type": "colar",
      "group": "Fim de ano"
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 53.5,
      "type": "Pulseiras",
      "group": "Zodiaco"
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 53.5,
      "type": "Pulseiras",
      "group": "Zodiaco"
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 53.5,
      "type": "Pulseiras",
      "group": "Zodiaco"
    },
  ];

  constructor(public productsService: ProductsService) {
    this.getingProducts();
  }

  getingProducts() {
    this.productsService.getProducts();
    // this.items = this.productsService.getProducts();
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

  modalCreate() {
    console.log("abrir modal de criação");
  }

  modalUpdate(id: number | undefined) {
    if (id !== undefined) {
      const data = this.productsService.getProduct(id);
    } else {
      alert("[Erro]: você não selecionou o produto");
    }
  }

  /* functions of send for modals
  async creatingProduct(product: ProductModel) {
    try {
      await this.productsService.createProduct(product);
    } catch {
      console.log("error");
    }
  }

  async updatingProduct(id: number, product: ProductModel) {
    try {
      await this.productsService.updateProduct(id, product);
    } catch {
      console.log("error");
    }
  }
  */

  deletingProduct(id: number | undefined) {
    if (id !== undefined) {
      const data = this.productsService.deleteProduct(id);
    } else {
      alert("[Erro]: você não selecionou o produto");
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }

  filterValor(): void {}
}
