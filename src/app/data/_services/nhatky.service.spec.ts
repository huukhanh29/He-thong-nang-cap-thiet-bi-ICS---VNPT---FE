import { TestBed } from '@angular/core/testing';

import { NhatKyService } from './nhatky.service';

describe('NhatKyService', () => {
  let service: NhatKyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhatKyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
