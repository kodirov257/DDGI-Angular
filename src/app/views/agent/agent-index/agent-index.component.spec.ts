import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentIndexComponent } from './agent-index.component';

describe('AgentIndexComponent', () => {
  let component: AgentIndexComponent;
  let fixture: ComponentFixture<AgentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
