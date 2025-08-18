import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  standalone: false,
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  finalValue: number = 0;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductsInCart();
  }

  getProductsInCart(): Product[] {
    this.cartService.productsInCart.subscribe(products => {
      this.productsInCart = products;
      this.calculateFinalValue();
    });

    return this.productsInCart;
  }

  calculateFinalValue(): number {
    const total = this.productsInCart.reduce((accumulator, product) => {
      const productPrice = product.valor || 0;
      return accumulator + productPrice;
    }, 0);

    this.finalValue = total;

    return this.finalValue;
  }

  removeFromCart(product: Product): void {
    this.cartService.removeProductFromCart(product);
  }

  cartCleaning(): void {
    this.cartService.clearCart();
  }

  savingCart(): void {}

  completePurchase(): void {}
}
