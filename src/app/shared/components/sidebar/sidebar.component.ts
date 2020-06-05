import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { heightAnimation } from '../../../animations/height.animation';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { ProjectService } from '../../../modules/projects/project.service';
import { ProjectModel } from '../../../models/project.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectDialogComponent } from '../../../modules/projects/add-project-dialog/add-project-dialog.component';
import { AuthService } from '../../../modules/auth/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [heightAnimation, fadeInAnimation],
})
export class SidebarComponent implements OnInit, OnDestroy {
  projectsAnimationState =
    localStorage.getItem('projectsAnimationState') || 'initial';
  projects: Array<ProjectModel> = [];
  projectSubscription: Subscription;
  fullName: string;
  @ViewChild('cdkDropList', { static: false }) dropList: any;
  startX;
  startY;
  currentX;
  currentY;
  sourceElement;
  dragMode = false;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.fullName = this.authService.getFullName();

    this.projectService.fetchAllProjects();
    this.projectSubscription = this.projectService.projectChanged.subscribe(
      (projects) => (this.projects = projects),
      () => (this.projects = [])
    );
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  addNewProject() {
    this.dialog.open(AddProjectDialogComponent, {
      width: '500px',
      autoFocus: false,
    });
  }

  changeState = () => {
    this.projectsAnimationState =
      this.projectsAnimationState === 'initial' ? 'final' : 'initial';
    localStorage.setItem('projectsAnimationState', this.projectsAnimationState);
  };

  toggleProjectList() {
    this.changeState();
  }

  dragStart(e, action) {
    this.dragMode = true;
    this.sourceElement = e.source.element.nativeElement;
    const rect = e.source.element.nativeElement.getBoundingClientRect();

    this.startX = rect.x;
    this.startY = rect.y;
  }

  dragMoved(e, action, i) {
    this.currentX = e.event.clientX;
    this.currentY = e.event.clientY;
    // if (this.startX < this.currentX) {
    // this.renderer.setStyle(this.dropList.nativeElement.children[i], 'border-style', 'solid');
    // this.renderer.setStyle(this.dropList.nativeElement.children[i], 'border-color', 'green');
    // } else if (this.startX > this.currentX) {
    // this.renderer.setStyle(this.dropList.nativeElement.children[i], 'border-style', 'solid');
    // this.renderer.setStyle(this.dropList.nativeElement.children[i], 'border-color', 'blue');
    // }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.dragMode = false;
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    if (event.previousIndex !== event.currentIndex) {
      this.projectService.reoderProjects(this.projects[event.previousIndex].id, this.projects[event.currentIndex].id);
      this.snackBar.open('Projects reordered', '');
    }
  }
}
