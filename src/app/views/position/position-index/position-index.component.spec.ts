import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionIndexComponent } from './position-index.component';

describe('PositionIndexComponent', () => {
  let component: PositionIndexComponent;
  let fixture: ComponentFixture<PositionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
