import { Injectable } from '@angular/core';
import { ProjectAlertModel } from '../../models/projectAlert.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IP, JSON_HEADER, PORT } from '../../constants';

@Injectable()
export class ProjectAlertsService {
  private currentAlerts: Array<ProjectAlertModel> = [];
  alertsChanged = new Subject<Array<ProjectAlertModel>>();

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  fetchAllAlerts(projectId: number) {
    this.http.get<Array<ProjectAlertModel>>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/projects/${ projectId }/alerts`, JSON_HEADER)
      .subscribe(alerts => {
        this.currentAlerts = alerts;
        this.alertsChanged.next(alerts);
      },
      () => this.alertsChanged.next([]));
  }

  addAlert(projectId: number, newAlert: ProjectAlertModel) {
    this.http.post<ProjectAlertModel>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/projects/${ projectId }/alerts`,
      { ...newAlert }, JSON_HEADER)
      .subscribe(alert => {
        this.currentAlerts = [alert].concat([...this.currentAlerts]);
        this.currentAlerts.sort(function compare(a, b) {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          // @ts-ignore
          return dateA - dateB;
        });
        this.alertsChanged.next([...this.currentAlerts]);
      });
  }

  removeAlert(projectId: number, alertId: number) {
    this.http.delete<ProjectAlertModel>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/projects/${ projectId }/alerts/${ alertId }`,
      JSON_HEADER)
      .subscribe(() => {
        this.currentAlerts = this.currentAlerts.filter(alert => alert.id !== alertId);
        this.alertsChanged.next([...this.currentAlerts]);
      });
  }

  updateAlertMessage(projectId: number, alertId: number, updatedAlert: ProjectAlertModel) {
    this.http.patch<ProjectAlertModel>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/projects/${ projectId }/alerts/${ alertId }`,
      { ...updatedAlert }, JSON_HEADER)
      .subscribe((alert) => {
        this.currentAlerts = [...this.currentAlerts.map(val => {
          if (val.id === alert.id) {
            val = alert;
          }
          return val;
        })];
        this.alertsChanged.next([...this.currentAlerts]);
      });
  }

  updateAlert(projectId: number, alertId: number, updatedAlert: ProjectAlertModel) {
    this.http.put<ProjectAlertModel>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/projects/${ projectId }/alerts/${ alertId }`,
      { ...updatedAlert}, JSON_HEADER)
      .subscribe((alert) => {
        this.currentAlerts = [...this.currentAlerts.map(val => {
          if (val.id === alert.id) {
            val = alert;
          }
          return val;
        })];
        this.alertsChanged.next([...this.currentAlerts]);
      });
  }

  getCurrentAlerts() {
    return [...this.currentAlerts];
  }
}
