import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-tray',
  templateUrl: './notification-tray.component.html',
  styleUrls: ['./notification-tray.component.scss']
})
export class NotificationTrayComponent implements OnInit {
  isLoading = true;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
  }
}
