import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MenuComponent } from '../menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.sass']
})
export class DesktopMenuComponent {
  isOpen: boolean = false;
  modalLogout: boolean = false;
  administrator: boolean = false;
  userId: number = 0;

  constructor(
    private loginService: LoginService,
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
    const id = localStorage.getItem('user_id');

    if (id !== null) {
      this.userId = JSON.parse(id);
    } else {
      console.log('Necessário fazer login');
    }

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
