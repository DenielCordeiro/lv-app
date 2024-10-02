import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  implements OnInit {
  productsQuantity!: number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.gettingProductsQuantity();
  }

  gettingProductsQuantity(): void {
    this.cartService.getProducsInCart().subscribe(
      result => {
        console.log('Quantidade de produtos no carrinho: ', result.length);
        this.productsQuantity = result.length;
      });
  }
}
