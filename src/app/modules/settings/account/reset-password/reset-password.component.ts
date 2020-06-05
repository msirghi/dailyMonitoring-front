import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fadeInAnimation } from '../../../../animations/fadeIn.animation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeInAnimation]
})
export class ResetPasswordComponent implements OnInit {

  passwordResetForm: FormGroup;

  constructor(private router: Router,
              private title: Title) {
    this.title.setTitle('Daily Monitoring | Password reset');
  }

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
        currentPwd: new FormControl('', [Validators.required]),
        newPwd: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
        confirmPwd: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
      },
      this.pwdMatchValidator);
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('newPwd').value === frm.get('confirmPwd').value
      ? null
      : { mismatch: true };
  }

  navigateAccount() {
    this.router.navigate(['/account']);
  }

  onSubmit() {

  }

}
