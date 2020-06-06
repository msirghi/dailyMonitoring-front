import { Component, Inject, OnInit } from '@angular/core';
import { ProjectAlertsService } from '../projectAlerts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-alert-creation',
  templateUrl: './project-alert-creation.component.html',
  styleUrls: ['./project-alert-creation.component.scss']
})
export class ProjectAlertCreationComponent implements OnInit {
  alertType: Array<{ classname: string, value: string, color: string }> = [
    { classname: 'danger-alert', value: 'Danger', color: '#f66359' },
    { classname: 'success-alert', value: 'Success', color: '#6bbd6e' },
    { classname: 'info-alert', value: 'Info', color: '#47a8f5' },
    { classname: 'warn-alert', value: 'Warning', color: '#ffaa2c' }
  ];

  alertForm: FormGroup;
  selectedType = { value: '' };
  editMode: boolean;
  alertId: number;

  constructor(private projectAlertsService: ProjectAlertsService,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<ProjectAlertCreationComponent>) {
  }

  ngOnInit() {
    this.alertForm = new FormGroup({
      message: new FormControl(this.data.message || '', [Validators.required]),
      date: new FormControl(this.data.date || ''),
      areMembersNotified: new FormControl(false)
    });

    this.editMode = this.data.editMode;

    if (this.editMode) {
      this.alertId = this.data.alertId;
    }

    if (this.data.type) {
      this.selectedType.value = _.startCase(this.data.type);
    }
  }

  onSubmit() {
    const { message, areMembersNotified } = this.alertForm.value;
    const date = new Date(this.alertForm.value.date);
    console.log(this.alertForm.value);

    this.projectAlertsService.addAlert(this.data.projectId, {
      message,
      date,
      // @ts-ignore
      type: this.selectedType.value.toUpperCase(),
      areMembersNotified
    });
    this.dialogRef.close(true);
  }

  onTypeSelect(type) {
    this.selectedType = type;
  }

  onUpdate() {
    const { message, areMembersNotified } = this.alertForm.value;

    this.projectAlertsService.updateAlert(this.data.projectId, this.alertId, {
      message,
      date: new Date(this.alertForm.value.date),
      // @ts-ignore
      type: this.selectedType.value.toUpperCase(),
      areMembersNotified
    });
    this.dialogRef.close(true);
  }
}
