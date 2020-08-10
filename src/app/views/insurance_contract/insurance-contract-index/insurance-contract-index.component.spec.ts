import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContractIndexComponent } from './insurance-contract-index.component';

describe('InsuranceContractIndexComponent', () => {
  let component: InsuranceContractIndexComponent;
  let fixture: ComponentFixture<InsuranceContractIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceContractIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceContractIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
