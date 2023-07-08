import { TestBed } from '@angular/core/testing';

import { NenTangService } from './nentang.service';

describe('NentangService', () => {
  let service: NenTangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NenTangService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
