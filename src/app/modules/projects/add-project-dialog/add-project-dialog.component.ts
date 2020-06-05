import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {
  addProjectDialogForm: FormGroup;
  isLoading = false;
  selectedColor: ColorModel = ColorPickerComponent.colors[0];

  constructor(private projectService: ProjectService,
              private dialogRef: MatDialogRef<AddProjectDialogComponent>,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.addProjectDialogForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  onCreateHandler() {
    this.isLoading = true;
    this.projectService.addNewProject({ ...this.addProjectDialogForm.value, color: this.selectedColor.color })
      .subscribe((res) => {
        this.router.navigate([`/project`, (res as any).id]);
        this.snackBar.open('Project successfully created', '');
        this.isLoading = false;
        this.dialogRef.close();
        this.projectService.fetchAllProjects();
      });
  }

  enterHandler(event) {
    if (event.keyCode === 13 && this.addProjectDialogForm.valid && this.selectedColor) {
      this.onCreateHandler();
    }
  }

  onColorSelect(color: ColorModel) {
    this.selectedColor = color;
  }
}
