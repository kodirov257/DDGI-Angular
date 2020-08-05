import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndexComponent } from './form-index.component';

describe('FormIndexComponent', () => {
  let component: FormIndexComponent;
  let fixture: ComponentFixture<FormIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
