import { TestBed } from '@angular/core/testing';

import { CrudPaymentsService } from './crud-payments.service';

describe('CrudPaymentsService', () => {
  let service: CrudPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
