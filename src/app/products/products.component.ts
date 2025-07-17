import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product.interface';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  standalone: false,
})
export class ProductsComponent implements OnInit {
  productId: number | undefined;
  title: string = 'Trabalhos disponíveis';
  products: Product[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.gettingProducts();
    this.clearProductsInLocalStorage();
  }


  clearProductsInLocalStorage(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentUrl = (event as NavigationEnd).url;

        if (currentUrl == '/products') {
          this.productsService.removeProductLocalStorage('selectedProduct')
        }
      });
  }

  sendProduct(product: Product): void {
    this.productsService.addProductLocalStorage(product);
  }

  gettingProducts(): void {
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

  modalCreate(product: Product | null): void {
    const products: Product[] = [];

    if(product !== null) {
      products.push(product);

      this.dialog.open<AddOrEditProductComponent>(AddOrEditProductComponent, {
        data: products
      });
    } else {
      this.dialog.open<AddOrEditProductComponent>(AddOrEditProductComponent);
    };
  }

  modalDelete(product: Product | null): void {
    const products: Product[] = [];

    if (product !== null) {
      products.push(product);

      this.dialog.open<DeleteProductComponent>(DeleteProductComponent, {
        data: products,
      });
    } else {
      console.log("[Error]: não foi possível encontrar produto selecionado para excluir");
    };
  }

  filter(newTitle: string): void {
    this.title = newTitle;
  }
}
