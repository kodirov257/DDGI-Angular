import { TestBed } from '@angular/core/testing';

import { PolicyRegistrationService } from './policy-registration.service';

describe('PolicyRegistrationService', () => {
  let service: PolicyRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
