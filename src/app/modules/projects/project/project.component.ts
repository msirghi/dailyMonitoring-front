import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { fadeInOutAnimation } from '../../../animations/fadeInOut.animation';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { TaskModel } from '../../../models/task.model';
import { MARKED_AS_COMPLETED_LABEL, UNDO_LABEL } from '../../../shared/constants';
import { AddContributorsDialogComponent } from '../add-contributors-dialog/add-contributors-dialog.component';
import { ProjectTaskService } from '../projectTask.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { ProjectService } from '../project.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { EditTaskDialogComponent } from '../../helpers/edit-task-dialog/edit-task-dialog.component';
import { ProjectAlertsService } from '../projectAlerts.service';
import { IP, PORT } from '../../../constants';
import { ProjectTaskModel } from '../../../models/projectTask.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [fadeInOutAnimation, fadeInAnimation]
})
export class ProjectComponent implements OnInit, OnDestroy {
  selectedProjectId: number = (this.activeRoute.params as any).value.id;
  currentTasks: any = [];
  tasksDone: Array<TaskModel> = [];
  animationState = 'initial';
  selectedOptions = [];
  currentTaskSubscription: Subscription;
  doneTasksSubscription: Subscription;
  isPieChart = true;
  projectName = '';
  areStatisticsShown = true;
  isLoading = true;
  editMode = false;
  topLoaderEnabled = false;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private title: Title,
              private projectTaskService: ProjectTaskService,
              private projectService: ProjectService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private projectAlertsService: ProjectAlertsService) {
    this.title.setTitle(`Daily Monitoring | Project`);
  }

  toggleStatistics() {
    this.areStatisticsShown = !this.areStatisticsShown;
  }

  doRequests() {
    this.projectTaskService.fetchAllProjectInProgressTasks(this.selectedProjectId);
    this.projectTaskService.fetchLastDoneTasks(this.selectedProjectId);

    // TODO: unsubscribe
    this.projectService.projectNameChanged
      .subscribe(name => {
        this.isLoading = false;
        this.projectName = name;
        this.title.setTitle(`Daily Monitoring | ${ name }`);
      });
    this.currentTaskSubscription = this.projectTaskService.currentTaskChanged
      .subscribe((tasks: Array<ProjectTaskModel>) => {
        this.topLoaderEnabled = false;
        this.currentTasks = tasks.map(task => {
          task.user.url = `${ IP }${ PORT }/images/${ task.user.username }`;
          return task;
        });
      });

    this.doneTasksSubscription = this.projectTaskService.pastTasksChanged
      .subscribe(tasks => {
        this.tasksDone = tasks.sort((task1, task2) => {
          if (new Date(task1.updatedAt) > new Date(task2.updatedAt)) {
            return -1;
          }
          if (new Date(task1.updatedAt) < new Date(task2.updatedAt)) {
            return 1;
          }
          return 0;
        });
      });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydownMain(event): void {
    if ((event.code === 'KeyQ') && this.animationState !== 'final') {
      event.preventDefault();
      this.changeState();
    }
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.projectService.setCurrentProjectId(routeParams.id);
      this.areStatisticsShown = false;
      this.selectedProjectId = routeParams.id;
      this.doRequests();
      this.projectService.getCurrentProjectName(routeParams.id);
      this.projectAlertsService.fetchAllAlerts(this.selectedProjectId);
    });
    this.doRequests();
  }

  ngOnDestroy() {
    this.currentTaskSubscription.unsubscribe();
    this.doneTasksSubscription.unsubscribe();
  }

  changeState() {
    this.animationState = this.animationState === 'initial' ? 'final' : 'initial';
  }

  onExpandTaskCreationHandler() {
    this.editMode = false;
    this.changeState();
  }

  markAsCompletedHandler(task) {
    setTimeout(() => {
      this.projectTaskService.markAsDone(this.selectedProjectId, task.task.id, task.task);
      this.openSnackBar(MARKED_AS_COMPLETED_LABEL, UNDO_LABEL);
      this.editMode = false;
    }, 200);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onAddTaskHandler(newTask) {
    this.projectTaskService.addNewProjectTask({
      name: newTask.name,
      categoryId: 1,
      assignedToId: newTask.assignedToId
    }, this.selectedProjectId);
    this.changeState();
    this.editMode = false;
  }

  openDetailsDialog(event) {
    event.stopPropagation();
    this.dialog.open(AddContributorsDialogComponent, {
      data: {
        projectId: this.selectedProjectId
      },
      width: '600px',
    });
  }

  nameChangeHandler(newName: string) {
    this.projectService.updateProjectName(newName, 1, this.selectedProjectId)
      .subscribe(() => this.openSnackBar('Project name changed successfully', ''));
  }

  colorChangeHandler(newColor) {
    this.projectService.updateProjectColor(this.projectName, newColor, this.selectedProjectId)
      .subscribe();
  }

  openSettingsDialog(event) {
    const projectColor = this.projectService.getCurrentProjectColor(this.selectedProjectId);
    const selectedColor = ColorPickerComponent.colors.find(c => c.color === projectColor);
    event.stopPropagation();
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: {
        projectId: this.selectedProjectId,
        projectName: this.projectName,
        projectColor: selectedColor
      },
      width: '600px',
    });
    dialogRef.afterClosed()
      .subscribe((result: { name: string, color: string }) => {
        if (result) {
          const { color, name } = result;
          let shouldUpdate = false;

          if (result && name !== this.projectName) {
            shouldUpdate = true;
            this.nameChangeHandler(name);
          }

          if (result && selectedColor.color !== color) {
            shouldUpdate = true;
            this.colorChangeHandler(color);
          }

          if (shouldUpdate) {
            setTimeout(() => this.projectService.fetchAllProjects(), 500);
            this.snackBar.open('Project info successfully updated', '');
          }
        }
      });
  }

  updateTask(task) {
    this.editMode = true;
    const dialog = this.dialog.open(EditTaskDialogComponent, {
      width: '350px',
      data: {
        name: task.task.name,
        projectId: this.selectedProjectId,
        selectedUser: task.user.id
      }
    });

    dialog.afterClosed()
      .subscribe(result => {
        if (result && (result.name !== task.task.name || result.userId !== task.user.id)) {
          this.topLoaderEnabled = true;
          const updatedTask = { ...task.task, name: result.name.trim() };

          if (result.userId) {
            updatedTask.assignedToId = result.userId;
          }
          this.projectTaskService.updateProjectTask(updatedTask, this.selectedProjectId, task.task.id);
          this.openSnackBar('Task updated', '');
        }
      });
  }
}
