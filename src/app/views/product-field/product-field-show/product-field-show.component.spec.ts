import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFieldShowComponent } from './product-field-show.component';

describe('ProductFieldShowComponent', () => {
  let component: ProductFieldShowComponent;
  let fixture: ComponentFixture<ProductFieldShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFieldShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFieldShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
