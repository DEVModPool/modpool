import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerPicklistComponent } from './planner-picklist.component';

describe('PlannerPicklistComponent', () => {
  let component: PlannerPicklistComponent;
  let fixture: ComponentFixture<PlannerPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerPicklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
