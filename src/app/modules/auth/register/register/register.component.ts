import { Component } from '@angular/core';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { fadeInAnimation } from '../../../../animations/fadeIn.animation';
import { fadeInOutAnimation } from '../../../../animations/fadeInOut.animation';
import { HttpErrorModel } from '../../../../models/httpError.model';
import { MailClientModel } from '../../../../models/mailClient.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInAnimation, fadeInOutAnimation]
})
export class RegisterComponent {
  error: HttpErrorModel = { show: false, message: '' };
  accountCreated = false;
  animationState = 'initial';
  isSpinnerEnabled = false;
  emailCheckInfo: MailClientModel = { isShown: false };
  email: string;

  constructor(private authService: AuthService,
              private title: Title) {
    this.title.setTitle('Daily Monitoring | Registration');
  }

  changeState = () => this.animationState = this.animationState === 'initial' ? 'final' : 'initial';

  submitHandler(formValues) {
    this.isSpinnerEnabled = true;

    const { email } = formValues;
    this.email = email;

    if (email.includes('@yahoo')) {
      this.emailCheckInfo = {
        isShown: true,
        redirectTo: 'https://yahoo.com',
        site: 'Yahoo'
      };
    } else if (email.includes('@gmail')) {
      this.emailCheckInfo = {
        isShown: true,
        redirectTo: 'https://gmail.com',
        site: 'Gmail'
      };
    }

    this.authService.registerUser({ ...formValues })
      .pipe(
        map(() => {
          this.accountCreated = true;
          this.changeState();
        }),
        catchError((error) => {
          this.isSpinnerEnabled = false;
          this.error = {
            show: true,
            message: error.error.message
          };
          return throwError(error);
        }),
        finalize(() => {
          this.isSpinnerEnabled = false;
        })
      ).subscribe();
  }
}
