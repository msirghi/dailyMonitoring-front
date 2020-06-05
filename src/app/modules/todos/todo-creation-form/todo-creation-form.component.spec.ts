import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreationFormComponent } from './todo-creation-form.component';

describe('TodoCreationFormComponent', () => {
  let component: TodoCreationFormComponent;
  let fixture: ComponentFixture<TodoCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
