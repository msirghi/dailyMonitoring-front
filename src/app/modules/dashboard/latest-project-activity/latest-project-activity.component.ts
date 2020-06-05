import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { ProjectTaskActivityModel } from '../../../models/projectTaskActivity.model';

@Component({
  selector: 'app-latest-project-activity',
  templateUrl: './latest-project-activity.component.html',
  styleUrls: ['./latest-project-activity.component.scss']
})
export class LatestProjectActivityComponent implements AfterViewInit {
  Highcharts = Highcharts;
  updateFromInput;

  @Input() lastTasks: Array<ProjectTaskActivityModel> = [];
  @Input() months: Array<string> = [];
  @Input() chartValues: Array<number> = [];

  chartOptions = {
    credits: {
      enabled: false
    },
    exporting: { enabled: false },
    chart: {
      type: 'spline',
      backgroundColor: {
        stops: [
          [0, 'rgb(255, 255, 255)'],
        ]
      },
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Tasks'
      }
    },
    tooltip: {
      valueSuffix: ' tasks'
    },
    series: [
      {
        name: 'Your activity',
        data: []
      },
    ]
  };

  constructor(private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  projectButtonHandler() {
    this.router.navigate(['/projects']);
  }

  ngAfterViewInit() {
    this.chartOptions.xAxis.categories = this.months;
    this.chartOptions.series[0].data = [...this.chartValues];
    this.updateFromInput = true;
    this.cdr.detectChanges();
  }
}
