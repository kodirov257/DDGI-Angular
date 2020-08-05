import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionIndexComponent } from './permission-index.component';

describe('PermissionIndexComponent', () => {
  let component: PermissionIndexComponent;
  let fixture: ComponentFixture<PermissionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
