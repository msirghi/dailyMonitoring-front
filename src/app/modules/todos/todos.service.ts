import { Injectable } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { currentTasksMock, tasksDoneMock } from '../../mocks/todos.mock';
import { Subject } from 'rxjs';

@Injectable()
export class TodosService {
  currentTaskChanged = new Subject<Array<TaskModel>>();
  doneTaskChanged = new Subject<Array<TaskModel>>();
  private currentTasks: Array<TaskModel> = currentTasksMock;
  private tasksDone: Array<TaskModel> = tasksDoneMock;
  private lastDeletedTask: { index: number, task: TaskModel };
  private currentTaskId: number = this.currentTasks.length;

  addNewTask(newTask: TaskModel) {
    this.currentTasks.push({ id: this.currentTaskId++, ...newTask });
    this.currentTaskChanged.next([...this.currentTasks]);
  }

  markAsCompleted(task: TaskModel) {
    this.lastDeletedTask = { index: this.currentTasks.indexOf(task), task: { id: this.currentTaskId++, ...task } };
    this.currentTasks.splice(this.currentTasks.indexOf(task), 1);
    task.taskDoneTime = new Date();
    this.tasksDone.push(task);

    if (this.tasksDone.length > 5) {
      this.tasksDone.shift();
    }

    this.currentTaskChanged.next([...this.currentTasks]);
    this.doneTaskChanged.next([...this.tasksDone]);
  }

  restoreLastDeletedTask() {
    this.currentTasks.splice(this.lastDeletedTask.index, 0, this.lastDeletedTask.task);
    this.tasksDone.splice(this.tasksDone.indexOf(this.lastDeletedTask.task), 1);
    this.currentTaskChanged.next([...this.currentTasks]);
    this.doneTaskChanged.next([...this.tasksDone]);
  }

  getCurrentTasks() {
    return [...this.currentTasks];
  }

  getDoneTasks() {
    return [...this.tasksDone];
  }
}
