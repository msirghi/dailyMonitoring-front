import { Component, DoCheck, EventEmitter, Input, KeyValueDiffers, OnInit, Output, ViewChild } from '@angular/core';
import { heightAnimation } from '../../../animations/height.animation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput, ThemePalette } from '@angular/material';
import { ProjectUserService } from '../projectUser.service';
import { UserInfoModel } from '../../../models/userInfo.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  animations: [heightAnimation],
})
export class CreateTaskComponent implements OnInit, DoCheck {
  @Output() addTaskHandler = new EventEmitter();
  @Output() expandTaskCreationHandler = new EventEmitter();
  @Output()
  @Input() currentState;
  @Input() projectId;
  @ViewChild('name', { static: true }) nameInput: MatInput;
  selectedUser: UserInfoModel;

  priorityColor: ThemePalette;
  isDescriptionEnabled = false;
  descriptionAnimationState = 'initial';

  users = [];
  prioritySelected: number;
  differ: any;
  newTaskForm: FormGroup;

  constructor(private differs: KeyValueDiffers,
              private projectUserService: ProjectUserService) {
  }

  changeSelectedUser(selectedUser) {
    this.selectedUser = selectedUser;
  }

  changeDescriptionAnimationState = () =>
    this.descriptionAnimationState = this.descriptionAnimationState === 'initial' ? 'final' : 'initial';

  toggleDescription = () => {
    this.changeDescriptionAnimationState();
    this.isDescriptionEnabled = !this.isDescriptionEnabled;
  };

  ngOnInit() {
    this.projectUserService.getAllProjectUsers(this.projectId);
    this.projectUserService.projectUsersChanged
      .subscribe(val => this.users = val);

    this.nameInput.focus();
    this.newTaskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      if (Number(this.prioritySelected) === Number(1)) {
        this.priorityColor = 'accent';
      } else if (Number(this.prioritySelected) === Number(2)) {
        this.priorityColor = 'primary';
      } else {
        this.priorityColor = null;
      }
    }
  }

  createTask() {
    if (this.newTaskForm.value.name) {
      this.addTaskHandler.emit({ ...this.newTaskForm.value });
    }
  }

  onSubmit() {
    this.addTaskHandler.emit({ ...this.newTaskForm.value, assignedToId: this.selectedUser.id });
    this.newTaskForm.reset();
    this.toggleDescription();
  }
}
