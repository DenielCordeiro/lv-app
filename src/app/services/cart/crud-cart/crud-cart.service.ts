import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom, Observable, Subject } from "rxjs";
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
  buidSubject: Subject<Product[]> = new Subject<Product[]>();
  gettingProductsInCart: Observable<Product[]> = this.buidSubject.asObservable();

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

  public getStaticProductsInCart(): Product[] {
    return this.productsInCart;
  }

  public getProductsInCart(): Observable<Product[]> {
    this.buidSubject.next(this.productsInCart);

    return this.gettingProductsInCart;
  }

  public addToCart(product: Product, userId: any): Product[] | string {
    if (this.productsInCart.length == 0) {
      this.products.push(product);
      this.saveCart(this.productsInCart, userId)
    } else {
      const ids: any[] = [];

      this.productsInCart.forEach(data => {
        ids.push(data._id);
      });

      const index: number = ids.indexOf(product._id);

      if (index == -1) {
        this.productsInCart.push(product);

        this.saveCart(this.productsInCart, userId)

      } else {
        console.log('produto já está no carrinho!');
      }
    }

    return this.productsInCart;
  }

  public removeProductFromCart(product: Product, userId: any): Product[] | string {
    const ids: any[] = [];

    this.productsInCart.forEach(data => {
      ids.push(data._id);
    });

    const index: number = ids.indexOf(product._id);

    if (index >= 0) {
      this.productsInCart.splice(index, 1);
      this.getProductsInCart();
      this.saveCart( this.productsInCart, userId)

      return this.productsInCart;
    } else  {
      return 'Produto não encontrado!';
    }
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

  public clearCart(userId: number): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/clear_cart/`, { user_id: userId }, { headers: this.header }))
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
