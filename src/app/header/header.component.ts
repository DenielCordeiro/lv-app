import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  implements OnInit {
  productsQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.gettingProductsInCart();
  }

  gettingProductsInCart(): void {
    this.cartService.getProductsInCart().subscribe(
      result => {
        this.productsQuantity = result.length;
      });
  }
}
