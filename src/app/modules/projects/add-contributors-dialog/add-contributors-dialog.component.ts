import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInOutAnimation } from '../../../animations/fadeInOut.animation';
import { ProjectUserService } from '../projectUser.service';

@Component({
  selector: 'app-add-contributors-dialog',
  templateUrl: './add-contributors-dialog.component.html',
  styleUrls: ['./add-contributors-dialog.component.scss'],
  animations: [fadeInOutAnimation]
})
export class AddContributorsDialogComponent implements OnInit {

  addContributorForm: FormGroup;
  isSent = false;
  errorMessage: { isShown: boolean, message?: string } = { isShown: false };

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any,
              private projectUserService: ProjectUserService) {
  }

  ngOnInit() {
    this.addContributorForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSend() {
    this.projectUserService.addUserToTheProject(this.addContributorForm.value.email, this.passedData.projectId)
      .subscribe((res: Response) => {
          this.errorMessage = { isShown: false };
          this.isSent = true;
        },
        error => {
          this.addContributorForm.setErrors({ invalid: true });
          this.errorMessage = { isShown: true, message: error.error.message };
        });
  }
}
