import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProjectAlertCreationComponent } from '../project-alert-creation/project-alert-creation.component';
import { ProjectAlertModel } from '../../../models/projectAlert.model';
import { heightAnimation } from '../../../animations/height.animation';
import { ProjectAlertsService } from '../projectAlerts.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../../helpers/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-alert',
  templateUrl: './project-alert.component.html',
  styleUrls: ['./project-alert.component.scss'],
  animations: [heightAnimation]
})
export class ProjectAlertComponent implements OnInit, OnDestroy {

  @Input() projectId: number;

  projectAlerts: Array<ProjectAlertModel> = [];
  subscription: Subscription;

  constructor(private dialog: MatDialog,
              private projectAlertsService: ProjectAlertsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.projectAlertsService.fetchAllAlerts(this.projectId);
    this.subscription = this.projectAlertsService.alertsChanged
      .subscribe(
        alerts => {
          this.projectAlerts = alerts.map(al => {
            // @ts-ignore
            al.type = al.type.toLocaleLowerCase();
            return al;
          });
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCreate() {
    const dialogRef = this.dialog.open(ProjectAlertCreationComponent, {
      data: {
        projectId: this.projectId,
        editMode: false
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.snackBar.open('Alert successfully added', '');
      }
    });
  }

  onUpdate(alert: ProjectAlertModel) {
    const dialogRef = this.dialog.open(ProjectAlertCreationComponent, {
      data: {
        projectId: this.projectId,
        type: alert.type,
        message: alert.message,
        date: alert.date,
        editMode: true,
        alertId: alert.id
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.snackBar.open('Alert updated');
      }
    });
  }

  onDelete(alertId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm deletion',
        message: 'Do you want to delete this alert?'
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.projectAlertsService.removeAlert(this.projectId, alertId);
        this.snackBar.open('Alert removed successfully');
      }
    });
  }
}
