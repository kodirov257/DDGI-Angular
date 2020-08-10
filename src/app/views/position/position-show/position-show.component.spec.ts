import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionShowComponent } from './position-show.component';

describe('PositionShowComponent', () => {
  let component: PositionShowComponent;
  let fixture: ComponentFixture<PositionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
