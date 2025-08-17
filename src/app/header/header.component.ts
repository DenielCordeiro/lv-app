import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { CartService } from '../services/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  cart: Product[] = [];
  profile: User = {};
  productsQuantity: number = 0;
  userId: number = 0;

  constructor(
    public route: Router,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
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

  getUserId(): number {
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}');
    this.userId = this.profile._id || 0;

    return this.userId;
  }
}
