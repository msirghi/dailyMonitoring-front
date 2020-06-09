import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { TaskFormComponent } from '../../modules/dashboard/task-form/task-form.component';
import { TaskCreationComponent } from '../../modules/dashboard/task-creation/task-creation.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from '../../modules/welcome/welcome.component';
import { InViewportModule } from 'ng-in-viewport';
import { TodosComponent } from '../../modules/todos/todos.component';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { TodoCreationFormComponent } from '../../modules/todos/todo-creation-form/todo-creation-form.component';
import { TodoPastTasksComponent } from '../../modules/todos/todo-past-tasks/todo-past-tasks.component';
import { ProjectsMainComponent } from '../../modules/projects/projects-main/projects-main.component';
import { ProjectComponent } from '../../modules/projects/project/project.component';
import { CreateTaskComponent } from '../../modules/projects/create-task/create-task.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AddContributorsDialogComponent } from '../../modules/projects/add-contributors-dialog/add-contributors-dialog.component';
import { RegisterSuccessComponent } from '../../modules/auth/register/register-success/register-success.component';
import { RegisterFormComponent } from '../../modules/auth/register/register-form/register-form.component';
import { SettingsDialogComponent } from '../../modules/projects/settings-dialog/settings-dialog.component';
import { ProjectsOptionsComponent } from '../../modules/projects/projects-options/projects-options.component';
import { DisableControlDirective } from '../../utils/disable-control.directive';
import { ProjectsChartsComponent } from '../../modules/projects/projects-charts/projects-charts.component';
import { AddProjectDialogComponent } from '../../modules/projects/add-project-dialog/add-project-dialog.component';
import { ColorPickerComponent } from '../../modules/projects/color-picker/color-picker.component';
import { NoStatisticsComponent } from '../../modules/dashboard/no-statistics/no-statistics.component';
import { LatestProjectActivityComponent } from '../../modules/dashboard/latest-project-activity/latest-project-activity.component';
import { LastPersonalActivityComponent } from '../../modules/dashboard/last-personal-activity/last-personal-activity.component';
import { NoLatestProjectActivityComponent } from '../../modules/dashboard/no-latest-project-activity/no-latest-project-activity.component';
import { TopLoaderComponent } from '../top-loader/top-loader.component';
import { MiddleLoaderComponent } from '../middle-loader/middle-loader.component';
import { LoginComponent } from '../../modules/auth/login/login.component';
import { ForgotPasswordComponent } from '../../modules/auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '../../modules/auth/new-password/new-password.component';
import { RegisterComponent } from '../../modules/auth/register/register/register.component';
import { AccountComponent } from '../../modules/settings/account/account.component';
import { ThemeChangeSettingsComponent } from '../../modules/settings/theme-change-settings/theme-change-settings.component';
import { MaterialModule } from '../../material.module';
import { EditTaskDialogComponent } from '../../modules/helpers/edit-task-dialog/edit-task-dialog.component';
import { ResetPasswordComponent } from '../../modules/settings/account/reset-password/reset-password.component';
import { ProjectAlertComponent } from '../../modules/projects/project-alert/project-alert.component';
import { ProjectAlertCreationComponent } from '../../modules/projects/project-alert-creation/project-alert-creation.component';
import { ConfirmationDialogComponent } from '../../modules/helpers/confirmation-dialog/confirmation-dialog.component';
import { QuickTodoDialogComponent } from '../../modules/todos/quick-todo-dialog/quick-todo-dialog.component';
import { AuraMenuComponent } from 'src/app/modules/aura/aura-menu/aura-menu.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TaskFormComponent,
    TaskCreationComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    TodosComponent,
    PopupDialogComponent,
    TodoCreationFormComponent,
    TodoPastTasksComponent,
    ProjectsMainComponent,
    ProjectComponent,
    CreateTaskComponent,
    AddContributorsDialogComponent,
    RegisterSuccessComponent,
    RegisterFormComponent,
    SettingsDialogComponent,
    ProjectsOptionsComponent,
    ProjectsChartsComponent,
    DisableControlDirective,
    AddProjectDialogComponent,
    ColorPickerComponent,
    NoStatisticsComponent,
    LatestProjectActivityComponent,
    LastPersonalActivityComponent,
    NoLatestProjectActivityComponent,
    TopLoaderComponent,
    MiddleLoaderComponent,
    AccountComponent,
    ThemeChangeSettingsComponent,
    EditTaskDialogComponent,
    ResetPasswordComponent,
    ProjectAlertComponent,
    ProjectAlertCreationComponent,
    ConfirmationDialogComponent,
    QuickTodoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    InViewportModule,
    HighchartsChartModule,
    MaterialModule
  ],
  providers: [
    DashboardService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue:
        {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
          horizontalPosition: 'left'
        }
    }
  ],
  exports: [
    AuraMenuComponent
  ],
  entryComponents: [
    PopupDialogComponent,
    AddContributorsDialogComponent,
    SettingsDialogComponent,
    AddProjectDialogComponent,
    EditTaskDialogComponent,
    ProjectAlertCreationComponent,
    ConfirmationDialogComponent,
    QuickTodoDialogComponent
  ]
})
export class DefaultModule {
}
