import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassShowComponent } from './klass-show.component';

describe('KlassShowComponent', () => {
  let component: KlassShowComponent;
  let fixture: ComponentFixture<KlassShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
