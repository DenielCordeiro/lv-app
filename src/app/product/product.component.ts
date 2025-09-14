import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage/storage.service';
import { ProductsService } from './../services/products/products.service';
import { MelhorEnvioService } from '../services/melhor-envio/melhor-envio.service';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../interfaces/product.interface';
import { Shipping } from '../interfaces/shipping.interface';
import { Sale } from '../interfaces/sale.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  standalone: false,
})
export class ProductComponent implements OnInit {
  searchForm!: FormGroup;
  productsInCart: Product[] = [];
  shippings: Shipping[] = [];
  products: Product[] = [];
  product: Product = {};
  sale: Sale = {};
  userProfile: User = {};
  postalCode: string = '';
  productsQuantity: number = 1;
  productIsInCart: boolean = false;

  constructor(
    public route: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    public productsService: ProductsService,
    public melhorEnvio: MelhorEnvioService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.buildingForm();
    this.getProductSelected();
    this.getUserProfile();
    this.getProductsInCart();
    this.checkIfProductIsInCart();
  }

  getProductSelected(): void {
    this.product = this.productsService.getProduct();

    if (!this.product) {
      console.error('Nenhum produto selecionado!');
      return;
    } else {
      this.products.push(this.product);
    }
  }

  getUserProfile(): void {
    try {
      this.userProfile = this.storage.get('profile', {});
    } catch (error) {
      console.error('Nenhum perfil encontrado:', error);
    }
  }

  getProductsInCart(): void {
    try {
      this.productsInCart = this.storage.get('cart', []);
    } catch (error) {
      console.error('Nenhum produto encontrado no carrinho:', error);
    }
  }

  checkIfProductIsInCart(): void {
    if (this.productsInCart.length > 0) {
      this.productsInCart.forEach(product => {

        if (product._id === this.product._id) {
          this.productIsInCart = true;
        } else {
          this.productIsInCart = false;
        }
      });
    } else {
      this.productIsInCart = false;
    }
  }

  buildingForm(): void {
    this.searchForm = this.formBuilder.group({
      "postalCode": [null],
    });
  }

  updateModal(id: number | undefined): void {}
  deleteModal(id: number | undefined): void {}

  searchShipping(): void {
    const postalCodeNumber = this.searchForm?.value;
    this.postalCode = String(postalCodeNumber?.postalCode)

    if (this.postalCode == 'null') {

      alert("[Atenção]: Precisa digitar algum número de CEP!");

    } else {
      this.melhorEnvio.getShipping(this.postalCode)
        .then(result => {
          const shippings = result;
          const prices: number[] = [];
          let smallPrice!: number;

          shippings.forEach((data: any) => {

            if (data.price != null && (data.company.name == "Jadlog" || data.company.name == "Correios")) {
              prices.push(data.price)
              smallPrice = Math.min(...prices.map(Number));

              if (data.price == smallPrice) {
                this.shippings.pop();
                this.shippings.push(data);

                this.sale.shipping = {
                  _id: data._id,
                  name: data.name,
                  price: Number(data.price),
                  postalCode: postalCodeNumber?.postalCode,
                }
              }
            }
          })

        })
        .catch(error => {
          console.log(error);
        })
    };
  };

  changeQuantity(action: string): number {
    if (action === 'add') {
      this.productsQuantity++;
    } else if (action === 'reduce' && this.productsQuantity > 1) {
      this.productsQuantity--;
    }
    return this.productsQuantity;
  }

  addingToCart(): void {
    this.cartService.addToCart(this.product)
      .then(() => {
        this.getProductsInCart();
        this.checkIfProductIsInCart();
      })
      .catch(error => {
        console.error('Erro ao adicionar produto ao carrinho:', error);
      });
  }

  removingProductFromCart(): void {
    this.cartService.removeProductFromCart(this.product)
      .then(() => {
        this.getProductsInCart();
        this.checkIfProductIsInCart();
      })
      .catch(error => {
        console.error('Erro ao remover produto do carrinho:', error);
      });
  }

  goToCart(): void {
    this.route.navigate(['/cart']);
  }
}
