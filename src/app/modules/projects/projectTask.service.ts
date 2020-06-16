import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IP, JSON_HEADER, PORT } from '../../constants';
import { Subject } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { AuthService } from '../auth/auth.service';
import { ProjectTaskModel } from '../../models/projectTask.model';

@Injectable()
export class ProjectTaskService {
  currentTaskChanged = new Subject<Array<ProjectTaskModel>>();
  pastTasksChanged = new Subject<Array<TaskModel>>();
  private currentTasks = [];
  private lastDoneTasks = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  fetchAllProjectInProgressTasks(projectId: number) {
    this.http.get<[]>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/tasks/inprogress`, JSON_HEADER)
      .toPromise()
      .then(tasks => {
        this.currentTasks = tasks;
        this.currentTaskChanged.next([...tasks]);
      });
  }

  updateProjectTask(task, projectId, taskId) {
    this.http.put(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/tasks/${ taskId }`,
      { ...task, categoryId: 1 },
      JSON_HEADER)
      .toPromise()
      .then((res: { assignedToName: string }) => {
        this.currentTasks = this.currentTasks.map(val => {
          if (val.task.id === taskId) {
            val.task = task;
            val.user.fullName = res.assignedToName;
          }
          return val;
        });

        this.currentTaskChanged.next([...this.currentTasks]);
      });
  }

  addNewProjectTask(newTask: { name: string, categoryId: 1, assignedToId: number }, projectId: number) {
    if (!newTask.assignedToId) {
      newTask.assignedToId = this.authService.getUserId();
    }

    this.http.post(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/tasks`, newTask, JSON_HEADER)
      .toPromise()
      .then(res => {
        this.currentTasks.push({ user: { fullName: (res as any).assignedToName, username: (res as any).username }, task: { ...res } });
        this.currentTaskChanged.next([...this.currentTasks]);
      });
  }

  markAsDone(projectId, taskId, task) {
    this.lastDoneTasks.push({ ...task, updatedAt: new Date() });
    if (this.lastDoneTasks.length > 5) {
      this.lastDoneTasks.shift();
    }

    this.pastTasksChanged.next([...this.lastDoneTasks]);
    this.http.put(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/tasks/${ taskId }/complete`, {})
      .toPromise()
      .then(() => {
        this.currentTasks = this.currentTasks.filter(taskVal => taskVal.task.id !== taskId);
        this.currentTaskChanged.next([...this.currentTasks]);
      });
  }

  fetchLastDoneTasks(projectId) {
    this.http.get(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/tasks/lastDone`, JSON_HEADER)
      .toPromise()
      .then((tasksDone: Array<TaskModel>) => {
        this.lastDoneTasks = tasksDone;
        this.pastTasksChanged.next([...tasksDone]);
      });
  }
}
