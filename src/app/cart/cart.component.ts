import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { CartService } from '../services/cart/cart.service';
import { User } from '../interfaces/user.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  standalone: false,
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  profile: User = {};

  constructor(
    private userService: UsersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.gettingProductsInCart();
    this.cartService.getProductsInCart();
  }

  gettingProductsInCart(): Product[] {
    this.gettingUserProfile();
    return this.productsInCart;
  }

  gettingUserProfile(): void {
    const user = localStorage.getItem('profile');
    this.profile = JSON.parse(user!);

    // this.cartService.productsInCart = this.profile.productsCart || [];
    // this.productsInCart = this.cartService.getStaticProductsInCart();
  }

  cartCleaning(): void {
    const user = localStorage.getItem('profile');
    this.profile = JSON.parse(user!);

    if (this.profile !== null) {
      const id = this.profile._id;

      this.cartService.clearCart(id)
        .then(result => {
          console.log('carrinho limpo: ', result);

        })
        .catch(error => {
          throw new Error('[Erro]: ', error);

        });
    } else {
      throw new Error('Não foi possível limpar o carrinho! ID do usuário(a) não encontrado, necessário realizar login ');
    }
  }
}
