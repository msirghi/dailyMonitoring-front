import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '../../../models/notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-tray',
  templateUrl: './notification-tray.component.html',
  styleUrls: ['./notification-tray.component.scss']
})
export class NotificationTrayComponent implements OnInit {
  isLoading = false;
  @Input() notifications: Array<NotificationModel>;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  markAsRead(notification: NotificationModel) {
    this.notificationService.markNotificationAsRead(notification.id);
  }

  markAllAsRead() {
    const arr: Array<number> = [];
    this.notifications.forEach(value => arr.push(value.id));

    this.notificationService.markNotificationAsReadByList(arr);
  }
}
