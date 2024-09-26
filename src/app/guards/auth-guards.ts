import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticated: boolean = false;

  constructor(
    private loginService: LoginService,
    public route: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.loginService.authedUserWithSuccess()) {

      if(state.url == '/dashboard') {
        this.authenticated = this.loginService.isAdministrator();

        return this.authenticated;
      }

      return true;
    } else {
      return false;
    }
  }
}
