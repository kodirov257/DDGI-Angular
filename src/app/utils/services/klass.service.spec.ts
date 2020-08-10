import { TestBed } from '@angular/core/testing';

import { KlassService } from './klass.service';

describe('KlassService', () => {
  let service: KlassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
