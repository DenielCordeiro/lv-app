import { TestBed } from '@angular/core/testing';

import { MelhorEnvioService } from './melhor-envio.service';

describe('MelhorEnvioService', () => {
  let service: MelhorEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MelhorEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
