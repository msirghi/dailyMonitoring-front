import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {

  @Input() projectName: string;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = '';

  constructor() {
  }

  ngOnInit() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.date = `${ days[new Date().getDay()] }, ${ this.months[new Date().getMonth()] } ${ new Date().getDate() }`;
  }

}
