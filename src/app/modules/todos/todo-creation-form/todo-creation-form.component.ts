import { Component, DoCheck, EventEmitter, Input, KeyValueDiffers, OnInit, Output, ViewChild } from '@angular/core';
import { heightAnimation } from '../../../animations/height.animation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput, ThemePalette } from '@angular/material';

@Component({
  selector: 'app-todo-creation-form',
  templateUrl: './todo-creation-form.component.html',
  styleUrls: ['./todo-creation-form.component.scss'],
  animations: [heightAnimation]
})
export class TodoCreationFormComponent implements OnInit, DoCheck {
  @Output() addTaskHandler = new EventEmitter();
  @Output() expandTaskCreationHandler = new EventEmitter();
  @Input() currentState;
  @ViewChild('name', { static: true }) nameInput: MatInput;

  priorityColor: ThemePalette;
  isDescriptionEnabled = false;
  descriptionAnimationState = 'initial';

  foods = [
    { value: '1', viewValue: 'Priority 1', color: 'accent' },
    { value: '2', viewValue: 'Priority 2', color: 'primary' },
    { value: '3', viewValue: 'Priority 3', color: '' }
  ];
  prioritySelected: number;
  differ: any;
  newTaskForm: FormGroup;

  constructor(private differs: KeyValueDiffers) {
  }

  changeDescriptionAnimationState = () =>
    this.descriptionAnimationState = this.descriptionAnimationState === 'initial' ? 'final' : 'initial';

  toggleDescription = () => {
    this.changeDescriptionAnimationState();
    this.isDescriptionEnabled = !this.isDescriptionEnabled;
  }

  ngOnInit() {
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
    this.addTaskHandler.emit({ ...this.newTaskForm.value });
    this.newTaskForm.reset();
    this.toggleDescription();
  }
}
