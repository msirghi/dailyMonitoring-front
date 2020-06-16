import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-projects-options',
  templateUrl: './projects-options.component.html',
  styleUrls: ['./projects-options.component.scss']
})
export class ProjectsOptionsComponent implements OnInit {

  @Input() areStatisticsShown: boolean;
  @Output() togglePie = new EventEmitter<void>();
  @Output() toggleCollaborators = new EventEmitter();
  @Output() toggleSettings = new EventEmitter();
  @Output() toggleNotifications = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleChart() {
    this.togglePie.emit();
  }

  toggleCollaboratorsWindow(event) {
    this.toggleCollaborators.emit(event);
  }

  toggleSettingsDialog(event) {
    this.toggleSettings.emit(event);
  }

  toggleNotificationSection($event) {
    this.toggleNotifications.emit($event);
  }

}
