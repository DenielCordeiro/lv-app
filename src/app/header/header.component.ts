import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { CartService } from '../services/cart/cart.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    MatIconModule
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})

export class HeaderComponent  implements OnInit {
  cart: Product[] = [];
  profile: User = {};
  productsQuantity: number = 0;
  userId: string = "";

  constructor(
    public route: Router,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartService.getProductsInCart();
    this.getProductsInCart();
  }

  getProductsInCart(): Product[] {
    this.cartService.productsInCart.subscribe(product => {
      this.cart = product;
      this.productsQuantity = this.cart.length;
    });

    return this.cart;
  }

  openCart(): void {
    this.getUserId();

    if (this.userId == null) {
      alert('[ Atenção ! ]: Necessário fazer login :)');
    } else {

      if (this.cart.length > 0) {
        this.route.navigateByUrl("cart/" + this.userId)
      } else {
        alert('[ Atenção ! ]: Carrinho vazio :)');
      }
    }
  }

  getUserId(): string {
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}');
    this.userId = this.profile._id || "";

    return this.userId;
  }
}
