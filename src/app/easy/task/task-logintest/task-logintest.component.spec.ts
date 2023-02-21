import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLogintestComponent } from './task-logintest.component';

describe('TaskLogintestComponent', () => {
  let component: TaskLogintestComponent;
  let fixture: ComponentFixture<TaskLogintestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskLogintestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLogintestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
