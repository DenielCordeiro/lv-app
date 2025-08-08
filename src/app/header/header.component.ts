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
    const profile = localStorage.getItem('profile');
    const userProfile = JSON.parse(profile!);

    if (userProfile._id === null) {
      return null;
    } else {
      return userProfile._id;
    }
  }

  gettingProductsInCart(): number {

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
