import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product.interface';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

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

  // searchProduct(idSelected: number): any[] {
  //   const product = [];

  //   for (let i = 0; i < this.products.length; i++) {

  //     if (this.products[i]._id == idSelected) {
  //       product.push(this.products[i]);
  //     }
  //   }

  //   return product
  // }

  modalCreate(product: Product | null) {
    if(product !== null) {
      this.dialog.open<AddOrEditProductComponent>(AddOrEditProductComponent, {
        width: '70%',
        data: product
      });

    } else {
      this.dialog.open<AddOrEditProductComponent>(AddOrEditProductComponent, {
        width: '70%',
      });
    }
  }

  modalDelete(product: Product | null) {
    if (product !== null) {
      this.dialog.open<DeleteProductComponent>(DeleteProductComponent, {
        width: '70%',
        data: product
      });
    } else {
      console.log("[Error]: não foi possível encontrar produto selecionado para excluir");
    }
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }
}
