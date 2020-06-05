import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects-main',
  templateUrl: './projects-main.component.html',
  styleUrls: ['./projects-main.component.scss']
})
export class ProjectsMainComponent implements OnInit {
  date = new Date();

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Daily Monitoring | Projects');
  }

}
