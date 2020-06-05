import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectStatisticsService} from '../projectStatistics.service';
import * as Highcharts from 'highcharts';
import {Subscription} from 'rxjs';
import {ProjectTaskService} from '../projectTask.service';
import {fadeInAnimation} from '../../../animations/fadeIn.animation';

@Component({
  selector: 'app-projects-charts',
  templateUrl: './projects-charts.component.html',
  styleUrls: ['./projects-charts.component.scss'],
  animations: [fadeInAnimation]
})
export class ProjectsChartsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() isPieChart: boolean;
  @Input() currentProjectId: number;

  pieChartData = {
    credits: {
      enabled: false
    },
    chart: {
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: {
        stops: [
          [0, 'rgb(255, 255, 255)'],
        ]
      },
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: 'black'
          }
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Task chart',
      data: [
        // {
        //   name: 'Dimas Sokol',
        //   y: 35,
        //   sliced: true,
        //   selected: true
        // },
      ]
    }]
  };

  chartOptions1 = {
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        name: 'Sirghi Mihail',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'Nicolae Savastin',
        data: [0.1, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {
        name: 'SOKOL',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ]
  };

  pieStatisticsSubscription: Subscription;
  projectTasksSubscription: Subscription;
  title = 'app';
  updateFromInput;
  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartCallback;
  timeLineChartCallback;
  chart;
  taskCounter = {
    totalTasks: 0,
    undoneTasks: 0,
    doneTasks: 0
  };
  isTimelineChartShown = false;

  constructor(private projectStatisticsService: ProjectStatisticsService,
              private projectTaskService: ProjectTaskService) {
    const self = this;

    this.chartCallback = chart => {
      self.chart = chart;
    };

    this.timeLineChartCallback = chart => {
      chart.reflow();
    };
  }

  ngAfterViewInit(): void {
    const self = this;
    const chart = this.chart;
    setTimeout(() => this.isTimelineChartShown = true, 500);
    chart.showLoading();

    this.projectTasksSubscription = this.projectTaskService.pastTasksChanged
      .subscribe(() => setTimeout(() => this.fetchStatistics(), 1000));

    this.pieStatisticsSubscription = this.projectStatisticsService.pieStatisticsChanged
      .subscribe(res => {
        // if (res.pieStatistics.length > 0) {
        chart.hideLoading();
        self.updateFromInput = true;
        this.taskCounter = {
          doneTasks: res.doneProjectTaskCount,
          undoneTasks: res.undoneProjectTaskCount,
          totalTasks: res.projectTaskCount
        };
        this.pieChartData.series[0].data = [];
        res.pieStatistics.forEach(userStats => this.pieChartData.series[0].data.push([userStats.fullName, userStats.taskPercentage]));
        // }
      });
  }

  ngOnInit() {
    // this.activeRoute.params.subscribe(routeParams => {
    //   this.projectStatisticsService.fetchPieStatistics(1, routeParams.id);
    // });
  }

  fetchStatistics = () => this.projectStatisticsService.fetchPieStatistics(1, this.currentProjectId);

  ngOnDestroy() {
    this.projectTasksSubscription.unsubscribe();
    this.pieStatisticsSubscription.unsubscribe();
  }

}
