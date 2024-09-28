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
  currentCountValue: number = 0;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
  ) {
    console.log('valor da contagem: ', this.currentCountValue);
  }

  addingToCart(): void {
    this.inOrOutOfTheCart = true;
    this.currentCountValue = this.countControl(this.inOrOutOfTheCart, this.currentCountValue);

    const productsInCart = this.cartService.addToCart(this.product);
    console.log('Produtos no carrinho: ', productsInCart);

  }

  removingProductFromCart(): void {
    this.inOrOutOfTheCart = false;
    this.currentCountValue = this.countControl(this.inOrOutOfTheCart, this.currentCountValue);

    const productsInCart = this.cartService.removeProductFromCart(this.product);
    console.log('Produtos no carrinho: ', productsInCart);

  }

  countControl(addOrRemove: boolean, currentValue: number): number {
    if (addOrRemove == true) {
      currentValue += 1;
    } else {
      currentValue -= 1;
    }

    return currentValue;
  }
}
