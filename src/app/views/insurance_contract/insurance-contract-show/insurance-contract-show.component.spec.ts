import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContractShowComponent } from './insurance-contract-show.component';

describe('InsuranceContractShowComponent', () => {
  let component: InsuranceContractShowComponent;
  let fixture: ComponentFixture<InsuranceContractShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceContractShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceContractShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
