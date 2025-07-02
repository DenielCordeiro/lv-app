import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  productsQuantity: number = 0;
  currentRoute: string = '';

  constructor(
    private cartService: CartService,
    public route: Router,
  ) {}

  ngOnInit(): void {
    this.gettingProductsInCart();
  }

  getUserId(): string | null {
    let id: string | null = localStorage.getItem('user_id');

    if (id !== null) {
      let userId: string = id.replace(/[\"]/g, '');


      return userId;
    } else {
      return null
    }
  }

  gettingProductsInCart(): number {
    this.cartService.getProductsInCart().subscribe(
      result => {
        this.productsQuantity = result.length;
      });

    return this.productsQuantity;
  }

  openCart(): void {
    const userId: string | null = this.getUserId();

    if (userId == null) {
      alert('[ Atenção ! ]: Necessário fazer login :)');
    } else {
      this.route.navigateByUrl("cart/" + userId)
    }
  }
}
