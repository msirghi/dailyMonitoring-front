import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTodoDialogComponent } from './quick-todo-dialog.component';

describe('QuickTodoDialogComponent', () => {
  let component: QuickTodoDialogComponent;
  let fixture: ComponentFixture<QuickTodoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickTodoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
