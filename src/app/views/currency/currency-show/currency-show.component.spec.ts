import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyShowComponent } from './currency-show.component';

describe('CurrencyShowComponent', () => {
  let component: CurrencyShowComponent;
  let fixture: ComponentFixture<CurrencyShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
