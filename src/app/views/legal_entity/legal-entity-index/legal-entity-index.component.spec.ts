import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntityIndexComponent } from './legal-entity-index.component';

describe('LegalEntityIndexComponent', () => {
  let component: LegalEntityIndexComponent;
  let fixture: ComponentFixture<LegalEntityIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
