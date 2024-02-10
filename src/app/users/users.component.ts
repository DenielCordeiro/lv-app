import { AuthService } from 'src/app/services/login/auth.service';

import { Component } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  products: ProductModel[] = [];
  myProducts: ProductModel[] = [];

  constructor(
    public user: UserModel,
    private productsService: ProductsService,
  ) {}

  getMyUser(): void {  };

  loadMyProducts(): void {
    // this.productsService.getMyProducts()
    //   .then(allProducts => {
    //     if(allProducts == null || undefined) {
    //       alert("[Atenção]: Não existe nenhum produto a venda!")
    //     } else {
    //       this.products.push(allProducts);

    //       this.products.forEach(data => {
    //         if (data.user == this.user.id) {
    //           this.myProducts.push(data);
    //         }
    //       });
    //     }
    //   })
    //   .catch(Error => {
    //     alert('ERRO: não conseguiu trazer os produtos');
    //     console.log(Error);
    //   })
  };
}
