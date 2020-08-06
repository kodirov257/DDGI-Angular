import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualIndexComponent } from './individual-index.component';

describe('IndividualIndexComponent', () => {
  let component: IndividualIndexComponent;
  let fixture: ComponentFixture<IndividualIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
