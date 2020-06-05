import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProjectUserService } from '../projectUser.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  animations: [fadeInAnimation]
})
export class SettingsDialogComponent implements OnInit {
  projectUserSubscription: Subscription;
  users: Array<UserModel> = [];
  isProjectNameInputDisabled = true;
  isLoading = true;
  projectName: string;
  nameForm: FormGroup;
  deleteButtonClicked = false;
  selectedColor: ColorModel;
  isProjectColorInputDisabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any,
              private projectUserService: ProjectUserService,
              private projectService: ProjectService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.projectName = passedData.projectName;
  }

  onColorSelect(color: ColorModel) {
    this.selectedColor = color;
  }

  ngOnInit() {
    this.selectedColor = this.passedData.projectColor;
    this.nameForm = new FormGroup({
      name: new FormControl(this.passedData.projectName)
    });

    this.projectUserService.getAllProjectUsers(this.passedData.projectId);
    this.projectUserSubscription = this.projectUserService.projectUsersChanged
      .subscribe(users => {
        this.isLoading = false;
        this.users = users;
      });
  }

  onUserRemove(user: UserModel) {
    this.projectUserService.removeUserFromTheProject(this.passedData.projectId, user.id)
      .then(() => {
        this.projectUserService.getAllProjectUsers(this.passedData.projectId);
        this.snackBar.open(`${ user.fullName } successfully removed from the project.`, '');
      });
  }

  getFinalData() {
    if (!this.selectedColor) {
      return {};
    }
    return {
      name: this.nameForm.value.name.trim(),
      color: this.selectedColor.color
    };
  }

  toggleDeleteButton = () => this.deleteButtonClicked = !this.deleteButtonClicked;

  onProjectDelete() {
    this.projectService.deleteProject(this.passedData.projectId)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Project deleted', '');
        this.projectService.fetchAllProjects();
      });
  }

  toggleProjectNameInput = () => this.isProjectNameInputDisabled = !this.isProjectNameInputDisabled;

  toggleProjectColorInput = () => this.isProjectColorInputDisabled = !this.isProjectColorInputDisabled;

  mailUser = (email: string) => (window as any).location = `mailto: ${ email }`;
}
