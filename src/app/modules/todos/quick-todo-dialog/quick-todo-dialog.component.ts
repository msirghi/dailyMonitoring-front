import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quick-todo-dialog',
  templateUrl: './quick-todo-dialog.component.html',
  styleUrls: ['./quick-todo-dialog.component.scss']
})
export class QuickTodoDialogComponent implements OnInit {
  todoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<QuickTodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }
}
