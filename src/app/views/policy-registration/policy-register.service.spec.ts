import { TestBed } from '@angular/core/testing';

import { PolicyRegisterService } from './policy-register.service';

describe('PolicyRegisterService', () => {
  let service: PolicyRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
