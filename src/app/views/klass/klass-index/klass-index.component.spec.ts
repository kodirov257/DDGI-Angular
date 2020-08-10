import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassIndexComponent } from './klass-index.component';

describe('KlassIndexComponent', () => {
  let component: KlassIndexComponent;
  let fixture: ComponentFixture<KlassIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
