import { TestBed } from '@angular/core/testing';

import { InsuranceContractService } from './insurance-contract.service';

describe('InsuranceContractService', () => {
  let service: InsuranceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
