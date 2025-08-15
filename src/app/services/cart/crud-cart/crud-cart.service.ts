import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom, Observable, Subject } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { Product } from "src/app/interfaces/product.interface";
import { environment } from "src/environments/environment";
import { StorageService } from "../../storage/storage.service";
import { User } from "src/app/interfaces/user.interface";

export abstract class CrudCartService<T extends BaseCrud>{
  http!: HttpClient;
  route: string = environment.api;
  header: any = this.buildHeader();
  productsInCart: Product[] = [];
  products: Product[] = [];
  profile: User = {};
  buidSubject: Subject<Product[]> = new Subject<Product[]>();
  gettingProductsInCart: Observable<Product[]> = this.buidSubject.asObservable();

  constructor(
    httpClient: HttpClient,
    storage: StorageService,
  ) {
    this.http = httpClient;
    this.productsInCart = storage.get('cart', []);
  }

  public buildHeader(): HttpHeaders {
    const token = localStorage.getItem('session');
    const headers = new HttpHeaders({
      token: `Bearer ${token}`,
    });

    return headers;
  }

  public addToCart(product: Product): Promise<Product[]> {
    if (this.productsInCart.length === 0) {
      this.productsInCart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.productsInCart));
    } else {
      this.productsInCart.forEach(productInCart => {

        if (productInCart._id === product._id) {
          console.log('Produto já está no carrinho!');
        } else {
          console.log('Produto não encontrado no carrinho, adicionando:', product);
          this.productsInCart.push(product);
          localStorage.setItem('cart', JSON.stringify(this.productsInCart));
        }
      });
    }

    return Promise.resolve(this.productsInCart);
  }

  public removeProductFromCart(product: Product): Promise<Product[]> {
    if (this.productsInCart.length === 0) {
      console.log('Carrinho vazio, não há produtos para remover!');
    } else {
      this.productsInCart = this.productsInCart.filter(item => item._id !== product._id);
      localStorage.setItem('cart', JSON.stringify(this.productsInCart));
      console.log('Produto removido do carrinho:', product);
    }

    return Promise.resolve(this.productsInCart);
  }

  public getProductsInCart(): Product[] {
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

    return this.productsInCart;
  }

  public getUserProfile(): User {
    const localLoadingUser = localStorage.getItem('profile');
    this.profile = JSON.parse(localLoadingUser!);

    return this.profile;
  }

  public getCartProducts(): Product[] {
    const localLoadingProducts = localStorage.getItem('cart');
    this.products = JSON.parse(localLoadingProducts!);

    return this.products;
  }

  public saveCart(productsInCart: Product[], user_id: any): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/save_cart/${user_id}`, { products: productsInCart }, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch(error => {
        return this.handleResponse(error) as T;
      })
  }

  public clearCart(user_id: any): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/clear_cart/${user_id}`, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch(error => {
        return this.handleResponse(error) as T;
      })
  }

  public buyProduct(): string {
    return 'comprou';
  }

  public handleResponse(response: BaseAPI<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
