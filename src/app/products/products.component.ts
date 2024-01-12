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
      "group": "Fim de ano",
      "selection": false
    },
    {
      "id": 2,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 23.5,
      "type": "Pulseiras",
      "group": "Zodiaco",
      "selection": false
    },
    {
      "id": 3,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 30.5,
      "type": "Pulseiras",
      "group": "Zodiaco",
      "selection": true
    },
    {
      "id": 4,
      "name": "Pulseira Signo Câncer",
      "description": "test",
      "valor": 43.5,
      "type": "Pulseiras",
      "group": "Zodiaco",
      "selection": true
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

  changeProductSelection(): void {
    console.log("function change product selection");
  }
}
