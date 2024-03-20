import { Component } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products/products.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  products: ProductModel[] = [];
  myProducts: ProductModel[] = [];
  myProfile: UserModel[] = [];
  userId: number = 0;

  constructor(
    public userProfile: UserService
  ) {
    this.getMyUser();

    console.log(this.myProfile);

  }

  getMyUser(): void {
    const id = localStorage.getItem('user_id');

    if(id !== null) {
      this.userId = JSON.parse(id)

      this.userProfile.getProfile(this.userId)
        .then(profile => {
          this.myProfile.push(profile);
        })
        .catch(error => {
          console.log(error);
        })

    } else {
      console.log("[ERRO]: Não foi possível encontrar o Perfil do usuário");
    }
   };

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
