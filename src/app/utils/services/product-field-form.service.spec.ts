import { TestBed } from '@angular/core/testing';

import { ProductFieldFormService } from './product-field-form.service';

describe('ProductFieldFormService', () => {
  let service: ProductFieldFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFieldFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
