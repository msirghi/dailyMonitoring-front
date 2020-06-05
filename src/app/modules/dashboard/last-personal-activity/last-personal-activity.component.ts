import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-personal-activity',
  templateUrl: './last-personal-activity.component.html',
  styleUrls: ['./last-personal-activity.component.scss']
})
export class LastPersonalActivityComponent implements OnInit {
  lastTasks: Array<{ fullName: string, project: string, task: string, date: string }> = [
    {
      project: 'BDE Project',
      fullName: 'Sirghi Mihail',
      task: 'New task 1',
      date: '5:50AM'
    },
    {
      project: 'Homework',
      fullName: 'Nicolae Savastin',
      task: 'Some amazing task that will be done',
      date: '7:30AM'
    },
    {
      project: 'Daily Monitoring',
      fullName: 'Dima Sokolovskii',
      task: 'Another task for daily',
      date: '9:30AM'
    },
    {
      project: 'Daily Monitoring',
      fullName: 'Dima Sokolovskii',
      task: 'Another great task for daily',
      date: '8:50PM'
    },
    {
      project: 'BDE Project',
      fullName: 'Sirghi Mihail',
      task: 'New task 1',
      date: '9:50PM'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
