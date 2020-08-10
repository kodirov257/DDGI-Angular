import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContractCreateComponent } from './insurance-contract-create.component';

describe('InsuranceContractCreateComponent', () => {
  let component: InsuranceContractCreateComponent;
  let fixture: ComponentFixture<InsuranceContractCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceContractCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
