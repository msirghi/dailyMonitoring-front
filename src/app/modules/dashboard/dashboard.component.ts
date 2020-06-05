import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { DashboardStatisticsService } from './dashboardStatistics.service';
import { UserActivityStatisticsModel } from '../../models/userActivityStatistics.model';
import { AuthService } from '../auth/auth.service';
import { fadeInAnimation } from '../../animations/fadeIn.animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    fadeInAnimation,
    trigger('toggleHeight', [
      state('hide', style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
      })),
      state('show', style({
        height: '*',
        opacity: '1',
      })),
      transition('hide => show', animate('500ms ease-in')),
      transition('show => hide', animate('500ms ease-out'))
    ])
  ],
  styles: [`
    animation {
      display: block;
    }
  `]
})
export class DashboardComponent implements OnInit {
  bigChart = [];
  cards = [];
  pieChart = [];
  areStatisticsShown = window.innerWidth > 768;
  currentState = this.areStatisticsShown ? 'show' : 'hide';
  isLoading = true;
  activityData: UserActivityStatisticsModel;

  constructor(private dashboardService: DashboardService,
              private title: Title,
              private dashboardStatisticsService: DashboardStatisticsService,
              private authService: AuthService) {
    this.title.setTitle('Daily Monitoring | Dashboard');
  }

  ngOnInit() {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dashboardStatisticsService.fetchDashboardStatistics()
      .subscribe(res => {
        this.isLoading = false;
        res.projectTaskActivity = res.projectTaskActivity.map(value => {
          if (value.userId === this.authService.getUserId()) {
            value.userName = 'You';
          }
          return value;
        });

        this.activityData = res;
      });
  }

  onShowStatisticsBtnClick() {
    this.areStatisticsShown = !this.areStatisticsShown;
    this.currentState = this.currentState === 'show' ? 'hide' : 'show';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 768 && !this.areStatisticsShown) {
      this.areStatisticsShown = true;
      this.currentState = 'show';
    } else if (window.innerWidth < 768 && this.currentState === 'hide') {
      this.currentState = 'show';
    } else {
      this.areStatisticsShown = false;
    }
  }
}
