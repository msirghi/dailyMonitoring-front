import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuotesService } from './modules/quotes.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosService } from './modules/todos/todos.service';
import { ProjectService } from './modules/projects/project.service';
import { ProjectTaskService } from './modules/projects/projectTask.service';
import { AuthService } from './modules/auth/auth.service';
import { ProjectUserService } from './modules/projects/projectUser.service';
import { ProjectStatisticsService } from './modules/projects/projectStatistics.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { DashboardStatisticsService } from './modules/dashboard/dashboardStatistics.service';
import { AccountService } from './modules/settings/account.service';
import { ColorSchemeService } from './modules/settings/color-scheme.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectAlertsService } from './modules/projects/projectAlerts.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    CookieService,
    QuotesService,
    AuthService,
    TodosService,
    ProjectService,
    ProjectTaskService,
    ProjectUserService,
    ProjectStatisticsService,
    DashboardStatisticsService,
    AccountService,
    ColorSchemeService,
    ProjectAlertsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
