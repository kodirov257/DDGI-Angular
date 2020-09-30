import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionIndexComponent } from './region-index.component';

describe('RegionIndexComponent', () => {
  let component: RegionIndexComponent;
  let fixture: ComponentFixture<RegionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
