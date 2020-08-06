import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntityShowComponent } from './legal-entity-show.component';

describe('LegalEntityShowComponent', () => {
  let component: LegalEntityShowComponent;
  let fixture: ComponentFixture<LegalEntityShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
