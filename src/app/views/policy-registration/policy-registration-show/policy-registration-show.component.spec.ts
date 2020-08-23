import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRegistrationShowComponent } from './policy-registration-show.component';

describe('PolicyRegistrationShowComponent', () => {
  let component: PolicyRegistrationShowComponent;
  let fixture: ComponentFixture<PolicyRegistrationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyRegistrationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRegistrationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
