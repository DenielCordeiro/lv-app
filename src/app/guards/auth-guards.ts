import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticated: boolean = false;

  constructor(
    private userService: UsersService,
    public route: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.userService.authedUserWithSuccess()) {

      if(state.url == '/dashboard') {
        this.authenticated = this.userService.isAdministrator();

        return this.authenticated;
      }

      return true;
    } else {
      return false;
    }
  }
}
