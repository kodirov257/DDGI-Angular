import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRegistrationIndexComponent } from './policy-registration-index.component';

describe('PolicyRegistrationIndexComponent', () => {
  let component: PolicyRegistrationIndexComponent;
  let fixture: ComponentFixture<PolicyRegistrationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyRegistrationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRegistrationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
