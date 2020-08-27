import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRegistrationCreateComponent } from './policy-registration-create.component';

describe('PolicyRegistrationCreateComponent', () => {
  let component: PolicyRegistrationCreateComponent;
  let fixture: ComponentFixture<PolicyRegistrationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyRegistrationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRegistrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
