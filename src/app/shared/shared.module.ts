import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatBadgeModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { SideNavListComponent } from './components/side-nav-list/side-nav-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuraMenuComponent } from '../modules/aura/aura-menu/aura-menu.component';
import { NotificationTrayComponent } from '../modules/notifications/notification-tray/notification-tray.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    SideNavListComponent,
    AuraMenuComponent,
    NotificationTrayComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTooltipModule,
    MatSlideToggleModule,
    DragDropModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    SideNavListComponent,
    AuraMenuComponent,
    NotificationTrayComponent
  ]
})
export class SharedModule {
}
