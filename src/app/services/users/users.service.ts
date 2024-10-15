import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { CrudUsersService } from './crud-users/crud-users.service';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudUsersService<User> {

  constructor(
    public localStorageService: LocalStorageService,
    public httpClient: HttpClient,
  ) {
    super(httpClient, localStorageService, '/profile');
  }
}
