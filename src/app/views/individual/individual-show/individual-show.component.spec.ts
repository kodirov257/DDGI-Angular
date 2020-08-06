import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualShowComponent } from './individual-show.component';

describe('IndividualShowComponent', () => {
  let component: IndividualShowComponent;
  let fixture: ComponentFixture<IndividualShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
