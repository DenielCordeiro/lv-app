import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product.interface';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  modalOpen: boolean = false;
  productId: number | undefined;
  title: string = 'Trabalhos disponíveis';
  products: Product[] = [];

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getingProducts();
    console.log(this.products);

  }

  getingProducts() {
    this.productsService.getProducts()
    .then(data => {
      if(data == null || data == undefined) {
        alert("[Atenção]: Não existe nenhum produto a venda!")
      } else {

        data.forEach(product => {
          this.products.push(product);
        });
      }
    })
    .catch(error => {
      alert('ERRO: não conseguiu trazer os produtos');
      console.log(error);
    })
  }

  searchProduct(idSelected: number): any[] {
    const product = [];

    for (let i = 0; i < this.products.length; i++) {

      if (this.products[i]._id == idSelected) {
        product.push(this.products[i]);
      }
    }

    return product
  }

  modalCreate(idSelected: number | null) {
    if(idSelected !== null) {
      const product = this.searchProduct(idSelected);

      this.dialog.open<AddOrEditComponent>(AddOrEditComponent, {
        width: '70%',
        data: product
      });

    } else {
      this.dialog.open<AddOrEditComponent>(AddOrEditComponent, {
        width: '70%',
      });
    }
  }

  modalDelete(idSelected: number | null) {
    if (idSelected !== null) {
      const product = this.searchProduct(idSelected);

      this.dialog.open<DeleteComponent>(DeleteComponent, {
        width: '70%',
        data: product
      });
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }
}
