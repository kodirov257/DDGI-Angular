import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFieldCreateComponent } from './product-field-create.component';

describe('ProductFieldCreateComponent', () => {
  let component: ProductFieldCreateComponent;
  let fixture: ComponentFixture<ProductFieldCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFieldCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFieldCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
