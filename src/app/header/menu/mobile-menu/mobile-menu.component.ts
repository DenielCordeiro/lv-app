import { Component } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { MenuComponent } from '../menu.component';

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
    private loginService: AuthService,
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
    this.administrator = this.loginService.isAdministrator();
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

    this.loginService.logout();
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
