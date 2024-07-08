import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { ProductModel } from '../models/product.model';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  modalOpen: boolean = false;
  productId: number | undefined;
  title: string = 'Trabalhos disponíveis';
  products: ProductModel[] = [];
  product: any;

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
  ) {
    this.getingProducts();
  }

  getingProducts() {
    this.productsService.getProducts()
    .then(allProducts => {
      if(allProducts == null || undefined) {
        alert("[Atenção]: Não existe nenhum produto a venda!")
      } else {
        this.products.push(allProducts);
        this.product = this.products[0];

        console.log(this.product);

      }
    })
    .catch(Error => {
      alert('ERRO: não conseguiu trazer os produtos');
      console.log(Error);
    })
  }

  modalCreate(id: number | null) {
    if(id !== null) {
      this.productsService.getProduct(id)
      .then(product => {
          this.dialog.open<AddOrEditComponent>(AddOrEditComponent, {
            width: '70%',
            data: product
          });
      });
    } else {
      this.dialog.open<AddOrEditComponent>(AddOrEditComponent, {
        width: '70%',
      });
    }
  }

  modalDelete(id: string | number | null) {
    if (id !== null) {
      this.dialog.open<DeleteComponent>(DeleteComponent, {
        width: '70%',
        data: id
      });
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }
}
