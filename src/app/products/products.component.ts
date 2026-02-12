import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { ProductsService } from '../services/products/products.service';

import { Product } from '../interfaces/product.interface';

import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
   imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
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
    // this.gettingProducts();
    this.gettingFalseDatas();
    this.clearProductsInLocalStorage();
  }

  gettingFalseDatas(): void {
    const data = {
      "products": {
        "docs": [
          {
            "_id": "698b89ce1176560e108b1bb2",
            "name": "teste",
            "description": "teste",
            "groups": "teste",
            "type": "teste",
            "valor": 4,
            "__v": 0,
            "file": {
              "createdAt": "2026-02-10T19:41:02.412Z"
            }
          },
          {
            "_id": "698b8a371176560e108b1bb6",
            "name": "teste",
            "description": "teste",
            "groups": "teste",
            "type": "teste",
            "valor": 5,
            "__v": 0,
            "file": {
              "createdAt": "2026-02-10T19:42:47.571Z"
            }
          },
          {
            "_id": "698a650169ebad3d45e30f95",
            "name": "teste",
            "description": "teste",
            "groups": "teste",
            "type": "teste",
            "valor": 2,
            "__v": 0,
            "file": {
              "createdAt": "2026-02-09T22:51:45.669Z"
            }
          },
          {
            "_id": "698a64713bf9cbd8b71aa4cb",
            "name": "teste",
            "description": "teste",
            "groups": "teste",
            "type": "teste",
            "valor": 2,
            "selection": false,
            "file": {
              "name": "string",
              "size": 2,
              "url": "string",
              "createdAt": "2026-02-11T23:16:56.911Z"
            }
          },
          {
            "_id": "698b89a71176560e108b1bae",
            "name": "teste",
            "description": "teste",
            "groups": "teste",
            "type": "teste",
            "valor": 3,
            "__v": 0,
            "file": {
              "createdAt": "2026-02-10T19:40:23.601Z"
            }
          }
        ],
        "hasNextPage": true,
        "hasPrevPage": false,
        "limit": 5,
        "nextPage": 2,
        "page": 1,
        "pagingCounter": 1,
        "prevPage": null,
        "totalDocs": 7,
        "totalPages": 2
      }
    };

    this.products = data.products.docs as Product[];
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
      .then(loadedProducts => {
        console.log("Produtos: ", loadedProducts);
        
        if(loadedProducts == null || loadedProducts == undefined) {
          alert("[Atenção]: Não existe nenhum produto a venda!")
        } else {
          this.products = loadedProducts.products.docs as Product[];
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
