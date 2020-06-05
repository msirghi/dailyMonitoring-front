import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddProjectDialogComponent } from '../../projects/add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-no-statistics',
  templateUrl: './no-statistics.component.html',
  styleUrls: ['./no-statistics.component.scss']
})
export class NoStatisticsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  toggleProjectCreationDialog() {
    this.dialog.open(AddProjectDialogComponent, {
      width: '500px',
      autoFocus: false
    });
  }
}
