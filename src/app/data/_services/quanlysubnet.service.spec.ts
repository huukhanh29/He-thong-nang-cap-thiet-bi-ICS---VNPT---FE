import { TestBed } from '@angular/core/testing';

import { QuanLySubnetService } from './quanlysubnet.service';

describe('QuanlysubnetService', () => {
  let service: QuanLySubnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLySubnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
