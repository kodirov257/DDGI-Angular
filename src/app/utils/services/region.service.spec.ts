import { TestBed } from '@angular/core/testing';

import { RegionService } from './region.service';

describe('RegionsService', () => {
  let service: RegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
