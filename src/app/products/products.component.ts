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
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  productId: number | undefined;
  title: string = 'Trabalhos disponíveis';
  products: Product[] = [];
  fakeProduct: Product = {
    _id: 1,
    user: 1,
    saleUser: "",
    name: "Colar Azul",
    description: "Colar com pedra",
    valor: 7845.44,
    type: "Colares",
    groups: "Inverno",
    selection: false,
    file: {
      name: "imagem do colar",
      size: 0.80,
      url: "https://firebasestorage.googleapis.com/v0/b/luz-violeta-186d5.appspot.com/o/1749600340539.png?alt=media&token=dd59ce63-9031-4430-911f-4babcbec0fd1",
      createdAt: {
        type: new Date(Date.UTC(2025, 5, 22)),
        default: new Date(Date.UTC(2025, 5, 22)),
      },
    },
    shipping: {
      name: "test",
      price: 54.78,
      postalCode: 13308197,
    },
    sale: {
      sold: false,
      userId: 0,
    },
  };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    // this.gettingProducts();
    this.clearProductsInLocalStorage();
    this.gettingFakeProduct();
  }


  clearProductsInLocalStorage(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentUrl = (event as NavigationEnd).url;

        if (currentUrl == '/products') {
          localStorage.removeItem('products');
        }
      });
  }

  sendProduct(product: Product): void {
    this.productsService.addProduct(product);
  }

  gettingFakeProduct(): void {
    this.products.push(this.fakeProduct);
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
