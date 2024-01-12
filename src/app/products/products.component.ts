import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { ProductModel } from '../models/product.model';
import { AddOrEditComponent } from './add-or-edit/add-or-edit';

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
      "valor": 15.5,
      "type": "colar",
      "group": "Fim de ano"
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 23.5,
      "type": "Pulseiras",
      "group": "Zodiaco"
    },
    {
      "id": 3,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 30.5,
      "type": "Pulseiras",
      "group": "Zodiaco"
    },
    {
      "id": 4,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 43.5,
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
    this.dialog.open<AddOrEditComponent>(AddOrEditComponent, {
      width: '70%',
    });
  }

  modalDelete(id: string | number | null) {
    if (id !== null) {
      // this.dialog.open<id, number | string>(id, {
      //   width: '70%',
      //   data: id
      // });
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }

  filterValor(): void {}

}
