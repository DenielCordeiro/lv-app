import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { UsersService } from '../services/users/users.service';
import { Product } from 'src/app/interfaces/product.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  product!: Product;
  userProfile!: User;

  constructor(
    private cartService: CartService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.productsInCart = this.gettingProductsInCart();

    this.gettingUserProfile();

    console.log('Produtos no carrinho: ', this.productsInCart);
  }

  gettingProductsInCart(): Product[] {
    const productsInCart = this.cartService.getStaticProductsInCart();

    return productsInCart;
  }

  gettingUserProfile(): User {
    const id = localStorage.getItem('user_id');

    if (id !== null) {
      const userId = JSON.parse(id);

      this.userService.getProfile(userId)
        .then(profile => {
          const products = profile.productsCart;

          if (products != undefined) {
            this.productsInCart.push(products);
          }
        })
        .catch(error => {
          console.log(error);
        });

    } else {
      console.log('erro!');
    }

    return this.userProfile;
  }
}
