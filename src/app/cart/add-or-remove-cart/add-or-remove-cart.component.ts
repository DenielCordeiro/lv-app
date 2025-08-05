import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-add-or-remove-cart',
  templateUrl: './add-or-remove-cart.component.html',
  styleUrls: ['./add-or-remove-cart.component.sass'],
  standalone: false,
})
export class AddOrRemoveCartComponent implements OnInit {
  @Input() product!: Product;
  inOrOutOfTheCart!: boolean;
  userId: string | null = localStorage.getItem('user_id');

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

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
    const profile = localStorage.getItem('profile');
    const userProfile = JSON.parse(profile || '{}');

    this.inOrOutOfTheCart = true;

    if (userProfile._id !== null) {
      this.cartService.addToCart(this.product, userProfile._id);
    } else {
      console.log('Necessário fazer login!');
    }
  }

  removingProductFromCart(): void {
    this.inOrOutOfTheCart = false;

    if (this.userId !== null) {
      const id: any = JSON.parse(this.userId);
      const productsInCart = this.cartService.removeProductFromCart(this.product, id);
    } else {
      console.log('Necessário fazer login!');
    }
  }
}
