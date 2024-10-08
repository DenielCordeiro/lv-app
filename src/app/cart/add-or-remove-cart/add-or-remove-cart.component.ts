import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-add-or-remove-cart',
  templateUrl: './add-or-remove-cart.component.html',
  styleUrls: ['./add-or-remove-cart.component.sass']
})
export class AddOrRemoveCartComponent implements OnInit {
  @Input() product!: Product;
  inOrOutOfTheCart!: boolean;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.gettingProductsInCart(this.product);
  }

  gettingProductsInCart(product: Product): boolean {
    const products: Product[] = this.cartService.getStaticProductsInCart();
    const ids: any[] = [];

    products.forEach(data => {
      ids.push(data._id);
    });

    const index: number = ids.indexOf(product._id);

    if (index >= 0) {
      return this.inOrOutOfTheCart = true;
    } else  {
      return this.inOrOutOfTheCart = false;
    }
  }

  addingToCart(): void {
    this.inOrOutOfTheCart = true;
    const productsInCart = this.cartService.addToCart(this.product);
  }

  removingProductFromCart(): void {
    this.inOrOutOfTheCart = false;
    const productsInCart = this.cartService.removeProductFromCart(this.product);
  }
}
