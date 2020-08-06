import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCreateComponent } from './individual-create.component';

describe('IndividualCreateComponent', () => {
  let component: IndividualCreateComponent;
  let fixture: ComponentFixture<IndividualCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
