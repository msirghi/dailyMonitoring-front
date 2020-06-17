import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external-login-dialog',
  templateUrl: './external-login-dialog.component.html',
  styleUrls: ['./external-login-dialog.component.scss']
})
export class ExternalLoginDialogComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isError = false;

  constructor(@Inject(MAT_DIALOG_DATA) private passedData,
              private authService: AuthService,
              private router: Router,
              public dialogRef: MatDialogRef<ExternalLoginDialogComponent>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.isError = false;
    this.authService.createUserWithOtherProvider({
      ...this.passedData.res,
      fullName: `${ this.passedData.res.firstName } ${ this.passedData.res.lastName }`,
      email: this.passedData.res.email,
      id: null,
      externalId: this.passedData.res.id,
      username: `${ this.form.value.username }`,
    })
      .subscribe((res: { externalId: string, username: string, email: string }) => {
        this.authService.authenticateUserWithOtherProvider(res.externalId, res.email);
        this.authService.authProvider.subscribe(
          (resData: { jwt: string }) => {
            this.router.navigate(['/dashboard']);
            this.isLoading = false;
            this.authService.setAuthToken(resData.jwt);
            this.dialogRef.close();
          });
      }, () => {
        this.isError = true;
        this.isLoading = false;
      });
  }
}
