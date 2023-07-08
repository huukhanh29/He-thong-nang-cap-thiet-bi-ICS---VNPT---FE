import { TestBed } from '@angular/core/testing';

import { ThietbiService } from './thietbi.service';

describe('ThietbiService', () => {
  let service: ThietbiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThietbiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
