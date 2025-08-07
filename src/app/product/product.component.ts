import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  shippings: Shipping[] = [];
  products: Product[] = [];
  product: Product = {};
  sale: Sale = {};
  userProfile: User = {};
  postalCode: string = '';
  productsQuantity: number = 1;

  constructor(
    public route: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public productsService: ProductsService,
    public melhorEnvio: MelhorEnvioService,
    public cartService: CartService
  ) {
    const profile = localStorage.getItem('profile');
    this.userProfile = JSON.parse(profile || '{}');
  }

  ngOnInit(): void {
    this.buildingForm();
    this.getProductSelected();
  }

  getProductSelected(): void {
    this.product = this.productsService.getProduct();
    this.products.push(this.product);
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
    if (this.product !== null) {
      this.cartService.addToCart(this.product);
    } else {
      console.log('Produto inválido!');
    }
  }

  removingProductFromCart(): void {
    if (this.product !== null) {
      this.cartService.removeProductFromCart(this.product);
    } else {
      console.log('Produto inválido!');
    }
  }

  goToCart(): void {
    this.route.navigate(['/cart']);
  }
}
