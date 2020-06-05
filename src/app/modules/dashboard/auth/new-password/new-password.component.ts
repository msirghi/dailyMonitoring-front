import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.scss"],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.newPasswordForm = new FormGroup(
      {
        newPassword: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
        ]),
        repeatNewPassword: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
        ]),
      },
      this.pwdMatchValidator
    );
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('newPassword').value === frm.get('repeatNewPassword').value
      ? null
      : {mismatch: true};
  }

  submitHandler() {
    console.log(this.newPasswordForm);
    console.log(this.newPasswordForm.value);
  }
}
