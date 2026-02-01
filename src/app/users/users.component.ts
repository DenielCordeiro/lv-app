import { Component } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent {
  products: Product[] = [];
  myProducts: Product[] = [];
  myProfile!: User;
  userId: number = 0;

  constructor(
    // public userProfile: UsersService
  ) {}

  getMyUser(): User {
    // const id = localStorage.getItem('user_id');

    // if(id !== null) {
    //   this.userId = JSON.parse(id)

    //   this.userProfile.getProfile(this.userId)
    //     .then(profile => {
    //       // this.myProfile.push(profile);
    //       this.myProfile = profile
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })

    // } else {
    //   console.log("[ERRO]: Não foi possível encontrar o Perfil do usuário");
    // }

    return this.myProfile
  };
}
