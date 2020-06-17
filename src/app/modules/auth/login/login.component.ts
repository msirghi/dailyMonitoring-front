import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ExternalLoginDialogComponent } from '../external-login-dialog/external-login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: { isShown: boolean, message?: string } = { isShown: false };
  isLoading = false;

  constructor(private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private title: Title,
              private router: Router,
              private oAuthService: SocialAuthService,
              private dialog: MatDialog) {
    this.title.setTitle('Daily Monitoring | Sign in');
    this.route.queryParams
      .subscribe(v => {
        if (Boolean(v.activated)) {
          this.snackBar.open('Account activated', '');
        }
      });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  enterHandler(event) {
    if (event.keyCode === 13 && this.loginForm.valid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.loginForm.setErrors({ invalid: true });
    this.authService.authenticateUser({
      ...this.loginForm.value
    }).subscribe(
      (result) => {
        this.router.navigate(['/dashboard']);
        this.authService.setAuthToken(result.body.jwt);
        // localStorage.setItem('refreshToken', result.body.refreshToken);
      },
      () => {
        this.isLoading = false;
        this.isError = { isShown: true, message: 'Invalid username or password.' };
      },
      () => this.isLoading = false);
  }

  openDialog(res) {
    this.dialog.open(ExternalLoginDialogComponent, {
      width: '400px',
      data: {
        res
      }
    });
  }

  login() {
    this.oAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        this.authService.getUserByExternalId(res.id)
          .subscribe(
            () => {
              this.authService.authenticateUserWithOtherProvider(res.id, res.email);
              setTimeout(() => window.location.reload(), 1000);
            },
            () => {
              this.openDialog(res);
            });
      });
  }
}
