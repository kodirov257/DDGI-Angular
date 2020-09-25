import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRegistrationEditComponent } from './policy-registration-edit.component';

describe('PolicyRegistrationEditComponent', () => {
  let component: PolicyRegistrationEditComponent;
  let fixture: ComponentFixture<PolicyRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
