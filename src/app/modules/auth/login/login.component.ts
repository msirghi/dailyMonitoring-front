import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';

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
              private router: Router) {
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

  login() {

  }

  logout() {

  }

}
