import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {
  priorities = [
    {value: '1', viewValue: 'Priority 1', color: 'accent'},
    {value: '2', viewValue: 'Priority 2', color: 'primary'},
    {value: '3', viewValue: 'Priority 3', color: ''}
  ];
  taskForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl(this.passedData.name, [Validators.required]),
      description: new FormControl(this.passedData.description, []),
    });
  }
}
