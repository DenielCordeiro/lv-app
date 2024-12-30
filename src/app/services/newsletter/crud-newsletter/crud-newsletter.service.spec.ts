import { TestBed } from '@angular/core/testing';

import { CrudNewsletterService } from './crud-newsletter.service';

describe('CrudNewsletterService', () => {
  let service: CrudNewsletterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudNewsletterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
