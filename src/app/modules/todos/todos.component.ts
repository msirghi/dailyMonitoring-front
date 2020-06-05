import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PopupDialogComponent } from '../../layouts/popup-dialog/popup-dialog.component';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';
import { fadeInAnimation } from '../../animations/fadeIn.animation';
import { TaskModel } from '../../models/task.model';
import { MARKED_AS_COMPLETED_LABEL, TASK_UPDATED_LABEL, UNDO_LABEL } from '../../shared/constants';
import { TodosService } from './todos.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [fadeInOutAnimation, fadeInAnimation]
})
export class TodosComponent implements OnInit, OnDestroy {
  currentTasks: Array<TaskModel>;
  tasksDone: Array<TaskModel>;
  animationState = 'initial';
  selectedOptions = [];
  currentTaskSubscription: Subscription;
  doneTasksSubscription: Subscription;
  todaysDate = new Date();

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private todoService: TodosService,
              private title: Title) {
    this.title.setTitle('Daily Monitoring | Tasks');
  }

  ngOnInit() {
    this.currentTasks = this.todoService.getCurrentTasks();
    this.tasksDone = this.todoService.getDoneTasks();
    this.currentTaskSubscription = this.todoService.currentTaskChanged.subscribe(tasks => this.currentTasks = tasks);
    this.doneTasksSubscription = this.todoService.doneTaskChanged.subscribe(tasks => this.tasksDone = tasks);
  }

  ngOnDestroy() {
    this.currentTaskSubscription.unsubscribe();
    this.doneTasksSubscription.unsubscribe();
  }

  changeState = () => this.animationState = this.animationState === 'initial' ? 'final' : 'initial';

  onExpandTaskCreationHandler = () => this.changeState();

  markAsCompletedHandler($event) {
    if ($event[0]) {
      $event.forEach((task) => this.todoService.markAsCompleted(task));
      this.openSnackBar(MARKED_AS_COMPLETED_LABEL, UNDO_LABEL);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action)
      .onAction().subscribe(() => this.todoService.restoreLastDeletedTask());
  }

  onAddTaskHandler(newTask) {
    this.todoService.addNewTask({
      ...newTask
    });
    setTimeout(() => this.changeState(), 200);
  }

  openDetailsDialog(event, task) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: { ...task },
      panelClass: 'full-width-dialog',
      width: '600px',
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'complete') {
          this.markAsCompletedHandler([task]);
        } else if (result && JSON.stringify(result) !== JSON.stringify(task)) {
          this.currentTasks[this.currentTasks.indexOf(task)] = result;
          this.openSnackBar(TASK_UPDATED_LABEL, '');
        }
      });
  }
}
