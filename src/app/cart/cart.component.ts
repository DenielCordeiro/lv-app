import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { CartService } from '../services/cart/cart.service';
import { User } from '../interfaces/user.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  userProfile: User = {};
  userId: string | null = localStorage.getItem('user_id');

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
    if (this.userId !== null) {
      const id = JSON.parse(this.userId);

      this.userService.getProfile(id)
        .then( profile => {
          this.userProfile = profile;

          if (this.userProfile.productsCart !== undefined) {
            if (this.productsInCart.length < 1) {
              const data: any[] = [];

              data.push(this.userProfile.productsCart);

              this.productsInCart = Array.from(data[0]);
              this.cartService.productsInCart = this.productsInCart;
            } else {
              return
            }
          } else {
            console.log('Nenhum produto foi adicionado no carrinho');
          }
        })
        .catch(error => {
          console.log('Perfil de usuário não encontrado', error);
        });

      this.productsInCart = this.cartService.getStaticProductsInCart();

    } else {
      console.log('ID: ', this.userId, ' de usuário não encontrado');
    }
  }

  cartCleaning(): void {
    if (this.userId !== null) {
      const id = JSON.parse(this.userId);

      this.cartService.clearCart(id)
        .then(result => {
          console.log('carrinho limpo: ', result);

        })
        .catch(error => {
          console.log('[Erro]: ', error);

        });
    } else {
      console.log('Não foi possível limpar o carrinho!');
      console.log('ID do usuário(a) não encontrado, necessário realizar login :)');

    }
  }
}
