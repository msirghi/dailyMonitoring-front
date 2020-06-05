import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailClientModel } from '../../../../models/mailClient.model';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent {

  @Input() emailCheckInfo: MailClientModel;
  @Input() email: string;

  constructor(private router: Router) {
  }

  redirectHome() {
    this.router.navigate(['/welcome']);
  }

  redirectToMailSite() {
    (window as any).location = this.emailCheckInfo.redirectTo;
  }

}
