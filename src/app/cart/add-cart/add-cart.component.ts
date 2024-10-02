import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart/cart.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.sass']
})
export class AddCartComponent {
  @Input() product!: Product;
  inOrOutOfTheCart: boolean = false;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
  ) {}

  addingToCart(): void {
    this.inOrOutOfTheCart = true;
    const productsInCart = this.cartService.addToCart(this.product);
  }

  removingProductFromCart(): void {
    this.inOrOutOfTheCart = false;
    const productsInCart = this.cartService.removeProductFromCart(this.product);
  }
}
