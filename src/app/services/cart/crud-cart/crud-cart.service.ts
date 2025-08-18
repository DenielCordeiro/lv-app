import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { Product } from "src/app/interfaces/product.interface";
import { environment } from "src/environments/environment";
import { User } from "src/app/interfaces/user.interface";

export abstract class CrudCartService<T extends BaseCrud>{
  http!: HttpClient;
  route: string = environment.api;
  header = this.buildHeader()
  private cartSubject = new BehaviorSubject<Product[]>([]);;
  productsInCart = this.cartSubject.asObservable();
  products: Product[] = [];
  profile: User = {};

  constructor(
    httpClient: HttpClient,
  ) {
    this.http = httpClient;
  }

  public buildHeader(): HttpHeaders {
    const token = localStorage.getItem('session');
    const headers = new HttpHeaders({
      token: `Bearer ${token}`,
    });

    return headers;
  }

  public addToCart(product: Product): Promise<Product[]> {
    if (!this.products || this.products.length === 0) {
      this.products.push(product);
      localStorage.setItem('cart', JSON.stringify(this.products));
      this.cartSubject.next(this.products);

    } else {
      this.products.forEach(productInCart => {

        if (productInCart._id === product._id) {
          console.warn('Produto já está no carrinho!');
        } else {
          this.products.push(product);
          localStorage.setItem('cart', JSON.stringify(this.products));
          this.cartSubject.next(this.products);
        }
      });
    }

    return Promise.resolve(this.products);
  }

  public removeProductFromCart(product: Product): Promise<Product[]> {
    const products = this.getProductsInCart();

    if (products.length === 0) {
      console.log('Carrinho vazio, não há produtos para remover!');
    } else {
      this.products = products.filter(item => item._id !== product._id);
      localStorage.setItem('cart', JSON.stringify(this.products));
      this.cartSubject.next(this.products);
    }

    return Promise.resolve(this.products);
  }

  public getProductsInCart(): Product[] {
    const profileUser = this.getUserProfile();
    const cartProducts = this.getCartProducts() || [];

    if (profileUser.productsCart && profileUser.productsCart.length > 0) {
      this.products = [...profileUser.productsCart];
      this.cartSubject.next(this.products);
    } else {
      this.products = [];
      this.cartSubject.next(this.products);
    }

    if (cartProducts && cartProducts.length > 0) {
      for (let index = 0; index < cartProducts.length; index++) {
        if (!this.products.some(product => product._id === cartProducts[index]._id)) {
          this.products.push(cartProducts[index]);
          this.cartSubject.next(this.products);
        } else {
          this.products = this.products.filter(product => product._id !== cartProducts[index]._id);
          this.cartSubject.next(this.products);
        }
      }
    } else {
      this.products = [];
      this.cartSubject.next(this.products);
    }

    return this.products;
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

  public clearCart(): Promise<T> {
    this.profile = this.getUserProfile();

    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/clear_cart/${this.profile._id}`, { headers: this.header }))
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
