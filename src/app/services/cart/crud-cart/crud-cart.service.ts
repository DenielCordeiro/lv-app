import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseAPI } from "src/app/interfaces/base-api.interface";
import { BaseCrud } from "src/app/interfaces/base-crud.interface";
import { Product } from "src/app/interfaces/product.interface";
import { environment } from "src/environments/environment";

export abstract class CrudCartService<T extends BaseCrud>{
  http!: HttpClient;
  route: string = environment.api;
  header: any = this.buildHeader();
  productsInCart!: Product[];
  products: Product[] = [];

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
    this.productsInCart = this.products;
  }

  public buildHeader(): HttpHeaders {
    const token = localStorage.getItem('session');
    const headers = new HttpHeaders({
      token: `Bearer ${token}`,
    });

    return headers;
  }

  public addToCart(product: Product): Product[] | string {
    if (this.productsInCart.length == 0) {
      this.products.push(product);

    } else {
      for (let index = 0; index < this.productsInCart.length; index++) {

        if (this.productsInCart[index]._id == product._id) {
          console.log('produto já está no carrinho!');
        } else if (this.productsInCart[index]._id != product._id) {
          this.products.push(product);
        } else {
          console.log('Erro!');
        }
      }
    }

    return this.productsInCart;
  }

  public removeProductFromCart(product: Product): Product[] | string {
    this.products = [];

    for (let index = 0; index < this.productsInCart.length; index++) {

      if (this.productsInCart[index]._id != product._id) {
        this.products.push(this.productsInCart[index]);
        this.productsInCart = this.products;
      } else {
        this.productsInCart = this.products;
      }
    }

    return this.productsInCart;
  }

  public saveCart(product: FormData): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/save_cart`, product, { headers: this.header }))
      .then(result => {
        return this.handleResponse(result) as T;
      })
      .catch(error => {
        return this.handleResponse(error) as T;
      })
  }

  public clearCart(userId: number): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/clear_cart`, { user_id: userId }, { headers: this.header }))
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
