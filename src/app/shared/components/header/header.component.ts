import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatMenuTrigger, MatSlideToggleChange } from '@angular/material';
import { ColorSchemeService } from '../../../modules/settings/color-scheme.service';
import { QuickTodoDialogComponent } from '../../../modules/todos/quick-todo-dialog/quick-todo-dialog.component';
import { Subscription } from 'rxjs';
import { NotificationModel } from '../../../models/notification.model';
import { NotificationService } from '../../../modules/notifications/notification.service';
import { IP, PORT } from '../../../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input('isButtonDisplayed') isButtonDisplayed: boolean;
  @ViewChild('toggleElement', { static: true }) ref: ElementRef;
  @ViewChild('menuTrigger', { static: true }) matMenuTrigger: MatMenuTrigger;
  @ViewChild('notificationMenuMenuTrigger', { static: true }) notificationMenuMenuTrigger: MatMenuTrigger;
  notificationSubscription: Subscription;
  notifications: Array<NotificationModel> = [];
  notificationUnreadCounter = 0;
  isNotShown = false;
  checked = false;

  public themes = [
    {
      name: 'dark',
      icon: 'brightness_3'
    },
    {
      name: 'light',
      icon: 'wb_sunny'
    }
  ];

  constructor(private authService: AuthService,
              private router: Router,
              private colorSchemeService: ColorSchemeService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.colorSchemeService.load();
    this.checked = this.colorSchemeService.currentActive() === 'dark';
    this.isNotShown = this.router.url === '/welcome';
    setTimeout(() => this.notificationService.fetchAllNotifications(), 1500);
    this.notificationSubscription = this.notificationService.notificationsChanged
      .subscribe(notifications => {
        this.notificationUnreadCounter = 0;
        this.notifications = notifications.map(notification => {
          if (notification.status === 'UNREAD') {
            this.notificationUnreadCounter++;
          }
          notification.avatarUrl = `${ IP }${ PORT }/images/${ notification.authorUsername }`;
          return notification;
        });
      });
  }

  toggleSideBar() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateHome() {
    this.router.navigate(['/dashboard']);
  }

  navigateAccountPage() {
    this.router.navigate(['/account']);
  }

  toggleNightMode($event: MatSlideToggleChange) {
    if ($event.checked) {
      (this.ref as any).checked = true;
      this.colorSchemeService.update(this.themes[0].name);
    } else {
      this.colorSchemeService.update(this.themes[1].name);
    }
  }

  quickTodoAddHandler() {
    this.dialog.open(QuickTodoDialogComponent, {
      width: '400px'
    });
  }

  openAuraMenu() {
    if (this.matMenuTrigger) {
      this.matMenuTrigger.openMenu();
    }
  }

  openNotificationMenu() {
    if (this.notificationMenuMenuTrigger) {
      this.notificationMenuMenuTrigger.openMenu();
    }
  }
}
