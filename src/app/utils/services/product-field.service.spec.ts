import { TestBed } from '@angular/core/testing';

import { ProductFieldService } from './product-field.service';

describe('ProductFieldService', () => {
  let service: ProductFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
