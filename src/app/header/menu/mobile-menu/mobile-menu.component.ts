import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.sass']
})
export class MobileMenuComponent {
  isOpen: boolean = false;
  modalLogout: boolean = false;
  administrator: boolean = false;
  userId: string | null = '';

  constructor(
    private userService: UsersService,
    public menu: MenuComponent,
    public route: Router,
  ) {
    this.getLogin();
  }

  changeMenuProducts(): void {
    if (this.isOpen == false) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  getLogin(): void {
    this.userId = localStorage.getItem('user_id');
    this.administrator = this.userService.isAdministrator();
  }

  modalLogoutIsOpen(): void {
    if (this.modalLogout == false) {
      this.modalLogout = true;
    } else {
      this.modalLogout = false;
    }
  }

  isLogout(): void {
    const noAction: string = 'noAction';

    this.userService.logout();
    this.closeMenu(noAction);
  }

  closeMenu(nextUrl: string): void {
    let activeRoute = this.route.url;

    if (nextUrl == 'noAction') {
      this.menu.changeIconBurguer();
    } else if (nextUrl == activeRoute) {
      console.log('Você já está nesta página!');
    } else {
      this.menu.changeIconBurguer();
    }
  }
}
