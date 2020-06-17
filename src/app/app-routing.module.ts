import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { TodosComponent } from './modules/todos/todos.component';
import { ProjectsMainComponent } from './modules/projects/projects-main/projects-main.component';
import { ProjectComponent } from './modules/projects/project/project.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './modules/auth/new-password/new-password.component';
import { AccountComponent } from './modules/settings/account/account.component';
import { ResetPasswordComponent } from './modules/settings/account/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'todo',
        component: TodosComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // {
      //   path: 'projects',
      //   component: ProjectsMainComponent,
      // },
      {
        path: 'project/:id',
        component: ProjectComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'resetPwd',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'newPassword',
    component: NewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
