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
import { AuraService } from './modules/aura.service';
import { NotificationService } from './modules/notifications/notification.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ExternalLoginDialogComponent } from './modules/auth/external-login-dialog/external-login-dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SocialLoginModule,
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
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '447118791336-nr6tkc4thqsrrs56pjv4uedoqv86a2ke.apps.googleusercontent.com'
              // '447118791336-9aq3okhmh8gvv6snsjd11t5sccs8i0h8.apps.googleusercontent.com'
            ),
          }
        ]
      } as SocialAuthServiceConfig,
    },
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
    AuraService,
    ProjectAlertsService,
    NotificationService,
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
