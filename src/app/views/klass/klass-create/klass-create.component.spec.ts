import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassCreateComponent } from './klass-create.component';

describe('KlassCreateComponent', () => {
  let component: KlassCreateComponent;
  let fixture: ComponentFixture<KlassCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
