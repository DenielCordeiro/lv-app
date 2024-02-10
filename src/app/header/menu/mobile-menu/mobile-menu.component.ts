import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';

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

  constructor(private loginService: AuthService) {
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
    this.loginService.logout();
    location.reload();
  }
}
