import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationModel } from '../../models/notification.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IP, JSON_HEADER, PORT } from '../../constants';

@Injectable()
export class NotificationService {
  private notifications: Array<NotificationModel> = [];
  notificationsChanged = new Subject<Array<NotificationModel>>();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  fetchAllNotifications() {
    this.http.get<Array<NotificationModel>>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/notifications`, JSON_HEADER)
      .subscribe(res => {
        this.notifications = res;
        this.notificationsChanged.next(res);
      });
  }

  markNotificationAsRead(notificationId: number) {
    this.http.patch(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/notifications/${ notificationId }`, {}, JSON_HEADER)
      .subscribe(() => {
        this.notifications = this.notifications.map(val => {
          if (val.id === notificationId) {
            val.status = 'READ';
          }
          return val;
        });
        this.notificationsChanged.next([...this.notifications]);
      });
  }

  markNotificationAsReadByList(notificationIdList: Array<number>) {
    this.http.patch(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/notifications`, { notificationIdList }, JSON_HEADER)
      .subscribe(() => {
        this.notifications = this.notifications.map(val => {
          val.status = 'READ';
          return val;
        });
        this.notificationsChanged.next([...this.notifications]);
      });
  }

  getNotifications() {
    return [...this.notifications];
  }
}
