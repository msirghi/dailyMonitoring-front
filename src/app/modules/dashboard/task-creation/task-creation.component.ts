import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent implements OnInit {
  taskCreationForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.taskCreationForm = new FormGroup({
      taskName: new FormControl('', [Validators.minLength(3), Validators.required]),
      taskDescription: new FormControl('', [])
    });
  }

  onSubmit() {
    console.log('Form submitted', this.taskCreationForm);
  }
}
