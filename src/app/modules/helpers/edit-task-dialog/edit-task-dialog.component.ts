import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatInput } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectUserService } from '../../projects/projectUser.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  taskForm: FormGroup;
  users;
  selectedUser;
  userSubscription: Subscription;
  @ViewChild('name', { static: false }) nameInput: MatInput;

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private cdr: ChangeDetectorRef,
              private projectUserService: ProjectUserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.projectUserService.getAllProjectUsers(this.data.projectId);
    this.userSubscription = this.projectUserService.projectUsersChanged.subscribe(val => {
      this.users = val;
      this.selectedUser = this.users.find(user => this.data.selectedUser === user.id);
    });
    this.taskForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required])
    });
  }

  onUserSelect(user) {
    this.selectedUser = user;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.nameInput.focus();
      this.cdr.detectChanges();
    }, 200);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  @HostListener('document:keydown.enter', ['$event'])
  enterHandler() {
    this.onSubmit();
  }

  onSubmit() {
    const userId = this.selectedUser ? this.selectedUser.id : this.authService.getUserId();
    if (this.taskForm.valid) {
      this.dialogRef.close({ name: this.taskForm.controls.name.value, userId });
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
