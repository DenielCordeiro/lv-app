import { TestBed } from '@angular/core/testing';

import { CrudUsersService } from './crud-users.service';

describe('CrudUsersService', () => {
  let service: CrudUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
