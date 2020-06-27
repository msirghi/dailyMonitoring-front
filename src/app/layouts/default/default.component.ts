import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { fadeAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [fadeAnimation]
})
export class DefaultComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav;

  isShown: boolean;
  isTokenObtained = false;

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
    if (cookieService.get('jit')) {
      authService.fetchAccessToken()
        .subscribe(result => {
          this.authService.setAuthToken(result.jwt);
          this.authService.setFullName(jwt_decode(result.jwt).fullName);
          this.isTokenObtained = true;
        });
    }
  }

  ngOnInit(): void {
    this.toggleSideBar(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isTokenObtained) {
      this.toggleSideBar(window.innerWidth);
    }
  }

  toggleSideBar(width: number) {
    this.isShown = width > 700;

    if (this.isShown && this.sidenav && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
