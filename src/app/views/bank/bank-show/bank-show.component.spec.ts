import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankShowComponent } from './bank-show.component';

describe('BankShowComponent', () => {
  let component: BankShowComponent;
  let fixture: ComponentFixture<BankShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
