import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { CartService } from '../services/cart/cart.service';
import { User } from '../interfaces/user.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { P } from '@angular/cdk/portal-directives.d-DbeNrI5D';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  standalone: false,
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  products: Product[] = [];
  profile: User = {};

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.gettingProductsInCart();
  }

  gettingProductsInCart(): void {
    try {
      const profileUser = this.getUserProfile();
      const cartProducts = this.getCartProducts() || [];

      if (profileUser.productsCart && profileUser.productsCart.length > 0) {
        this.productsInCart = [...profileUser.productsCart];
      } else {
        console.warn('Nenhum produto encontrado no perfil de usuário(a).');
      }

      if (cartProducts && cartProducts.length > 0) {
        for (let index = 0; index < cartProducts.length; index++) {
          if (!this.productsInCart.some(product => product._id === cartProducts[index]._id)) {
            this.productsInCart.push(cartProducts[index]);
          }
        }
      } else {
        console.warn('Nenhum produto encontrado no carrinho local.');
      }
    } catch (error) {
      console.error('Não foi possível obter os produtos no carrinho:', error);
    }
  }


  getUserProfile(): User {
    const localLoadingUser = localStorage.getItem('profile');
    this.profile = JSON.parse(localLoadingUser!);

    return this.profile;
  }

  getCartProducts(): Product[] {
    const localLoadingProducts = localStorage.getItem('cart');
    this.products = JSON.parse(localLoadingProducts!);

    return this.products;
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
