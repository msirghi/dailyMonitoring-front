import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPastTasksComponent } from './todo-past-tasks.component';

describe('TodoPastTasksComponent', () => {
  let component: TodoPastTasksComponent;
  let fixture: ComponentFixture<TodoPastTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPastTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPastTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
