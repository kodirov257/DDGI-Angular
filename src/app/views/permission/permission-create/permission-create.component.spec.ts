import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionCreateComponent } from './permission-create.component';

describe('CreateComponent', () => {
  let component: PermissionCreateComponent;
  let fixture: ComponentFixture<PermissionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should permission-create', () => {
    expect(component).toBeTruthy();
  });
});
