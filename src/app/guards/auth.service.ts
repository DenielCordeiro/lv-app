import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  login(token: string) {
    localStorage.setItem('auth_token', token);
    this.isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false);
  }
}