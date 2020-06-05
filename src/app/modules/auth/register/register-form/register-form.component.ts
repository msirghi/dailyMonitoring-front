import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorModel } from '../../../../models/httpError.model';
import { fadeInAnimation } from '../../../../animations/fadeIn.animation';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [fadeInAnimation]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  @Input() error: HttpErrorModel;
  @Output() onSubmit = new EventEmitter();
  @Input() accountCreated: boolean;
  @Input() isSpinnerEnabled: boolean;

  constructor() {
  }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.pattern('(^(?=.{1,40}$)[a-zA-Z]+(?:[-\'\\s][a-zA-Z]+)*$)'),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
          Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ]),
        agree: new FormControl('', [Validators.required]),
      },
      this.pwdMatchValidator
    );
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('repeatPassword').value
      ? null
      : { mismatch: true };
  }

  submitHandler() {
    delete this.registerForm.value.agree;
    delete this.registerForm.value.repeatPassword;
    this.onSubmit.emit({ ...this.registerForm.value });
  }

}
