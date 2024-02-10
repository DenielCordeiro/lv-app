import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../services/login/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.authedUserWithSuccess()) {

      console.log(state.url);


      if(state.url == '/dashboard') {
        this.authenticated = this.authService.isAdministrator();

        return this.authenticated;
      }

      return true;
    } else {
      return false;
    }
  }
}
