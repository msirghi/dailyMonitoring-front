import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { AccountService } from '../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IP, PORT } from '../../../constants';
import { ImageCropperComponent } from '../../helpers/image-cropper/image-cropper.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit, OnDestroy {

  personalInfoForm: FormGroup;
  accountSubscription: Subscription;
  isLoading = true;
  isTopLoaderEnabled = false;
  editMode = false;
  isSaveButtonDisabled = false;
  imageUrl = '';

  constructor(private accountService: AccountService,
              private snackBar: MatSnackBar,
              private router: Router,
              private title: Title,
              private dialog: MatDialog) {
    title.setTitle('Daily Monitoring | Account');
  }

  ngOnInit() {
    this.accountService.fetchUserInfo();

    this.personalInfoForm = new FormGroup({
      fullName: new FormControl({ value: '', disabled: !this.editMode }, [Validators.required]),
      username: new FormControl({ value: '', disabled: !this.editMode }, [Validators.min(3), Validators.required]),
      email: new FormControl({ value: '', disabled: !this.editMode }, [Validators.email, Validators.required])
    });

    this.accountSubscription = this.accountService.userInfoChanged.subscribe(user => {
      this.isLoading = false;
      this.imageUrl = `${ IP }${ PORT }/images/${ user.imageName }`;
      this.personalInfoForm.patchValue({
        fullName: user.fullName,
        username: user.username,
        email: user.email
      });
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  disablePersonalInfoForm() {
    this.personalInfoForm.controls.fullName.disable();
    this.personalInfoForm.controls.email.disable();
  }

  toggleAndDisablePersonalForm() {
    this.toggleEditMode();
    this.disablePersonalInfoForm();
  }

  onSavePersonalInfo() {
    this.disablePersonalInfoForm();
    const user = this.accountService.getUserInfo();
    if (this.personalInfoForm.value.fullName !== user.fullName ||
      this.personalInfoForm.value.username !== user.username ||
      this.personalInfoForm.value.email !== user.email
    ) {
      this.isTopLoaderEnabled = true;
      this.accountService.updateUserInfo({ ...this.personalInfoForm.value })
        .subscribe(
          () => {
            this.snackBar.open('Account info updated', '');
            this.isTopLoaderEnabled = false;
            this.toggleAndDisablePersonalForm();
            this.isSaveButtonDisabled = false;
          },
          err => {
            this.enablePersonalInfoInputs();
            this.snackBar.open(err.error.message, '');
            this.isTopLoaderEnabled = false;
            this.isSaveButtonDisabled = true;
          });
    } else {
      this.toggleAndDisablePersonalForm();
    }
  }

  enablePersonalInfoInputs() {
    this.personalInfoForm.controls.fullName.enable();
    this.personalInfoForm.controls.email.enable();
  }

  onEditAccountInfo() {
    this.isSaveButtonDisabled = false;
    this.enablePersonalInfoInputs();
    this.toggleEditMode();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  navigateAccountReset() {
    this.router.navigate(['/resetPwd']);
  }

  updateAccountAvatar() {
    const dialogRef = this.dialog.open(ImageCropperComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.accountService.updateImage(res);
      }
    });
  }
}
