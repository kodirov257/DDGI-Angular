import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchShowComponent } from './branch-show.component';

describe('BranchShowComponent', () => {
  let component: BranchShowComponent;
  let fixture: ComponentFixture<BranchShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
