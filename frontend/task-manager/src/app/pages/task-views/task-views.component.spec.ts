import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewsComponent } from './task-views.component';

describe('TaskViewsComponent', () => {
  let component: TaskViewsComponent;
  let fixture: ComponentFixture<TaskViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
