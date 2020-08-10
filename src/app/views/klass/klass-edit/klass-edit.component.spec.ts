import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassEditComponent } from './klass-edit.component';

describe('KlassEditComponent', () => {
  let component: KlassEditComponent;
  let fixture: ComponentFixture<KlassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
