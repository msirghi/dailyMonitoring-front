import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../../modules/projects/project.service';
import { ProjectModel } from '../../../models/project.model';
import { heightAnimation } from '../../../animations/height.animation';
import { MatDialog } from '@angular/material';
import { AddProjectDialogComponent } from '../../../modules/projects/add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss'],
  animations: [heightAnimation]
})
export class SideNavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  projectsAnimationState = localStorage.getItem('projectsAnimationState') || 'initial';
  projects: Array<ProjectModel> = [];

  constructor(private projectService: ProjectService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.projectService.projectChanged.subscribe(val => this.projects = val);
  }

  changeState = () => {
    this.projectsAnimationState = this.projectsAnimationState === 'initial' ? 'final' : 'initial';
    localStorage.setItem('projectsAnimationState', this.projectsAnimationState);
  }

  onAddProject() {
    this.matDialog.open(AddProjectDialogComponent, {
      width: '500px',
      autoFocus: false
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
