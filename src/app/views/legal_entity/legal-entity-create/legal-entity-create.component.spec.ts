import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntityCreateComponent } from './legal-entity-create.component';

describe('LegalEntityCreateComponent', () => {
  let component: LegalEntityCreateComponent;
  let fixture: ComponentFixture<LegalEntityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
