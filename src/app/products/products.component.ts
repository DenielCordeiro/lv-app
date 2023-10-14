import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { ProductModel } from '../models/product.model';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  productChecked: boolean = false;
  modalOpen: boolean = false;
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

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,) {
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
    this.dialog.open<AddComponent>(AddComponent, {
      width: '70%'
    });
  }

  modalUpdate(id: string | number | null) {
    if (id !== null) {
      this.dialog.open<UpdateComponent, number | string>(UpdateComponent, {
        width: '70%',
        data: id
      });
    }
  }

  modalDelete(id: string | number | null) {
    if (id !== null) {
      this.dialog.open<UpdateComponent, number | string>(UpdateComponent, {
        width: '70%',
        data: id
      });
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }

  filterValor(): void {}

}
