import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  productsQuantity: number = 0;
  currentRoute: string = '';

  constructor(public route: Router) {}

  ngOnInit(): void {}

  getUserId(): void {}

  openCart(): void {
    const userId: string | null = "";

    if (userId == null) {
      alert('[ Atenção ! ]: Necessário fazer login :)');
    } else {
      this.route.navigateByUrl("cart/" + userId)
    }
  }
}
