import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionShowComponent } from './region-show.component';

describe('RegionShowComponent', () => {
  let component: RegionShowComponent;
  let fixture: ComponentFixture<RegionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
