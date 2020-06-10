import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { IP, JSON_HEADER, PORT } from '../../constants';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  storedUser = new Subject();
  authToken = '';
  userId: number;
  fullName: string;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {

    if (!this.cookieService.get('jit')) {
      this.router.navigate(['/login']);
    }
  }

  setAuthToken(token: string) {
    console.log(token);
    this.authToken = token;
  }

  setFullName(fullName: string) {
    this.fullName = _.startCase(fullName);
  }

  getFullName() {
    return this.fullName;
  }

  getUserId() {
    if (this.authToken.length > 20) {
      return jwt_decode(this.authToken).id;
    }
  }

  isTokenExpired() {
    if (this.authToken) {
      return Date.now() > jwt_decode(this.authToken).exp * 1000;
    }
    this.logout();
    this.router.navigate(['/login']);
  }

  fetchAccessToken() {
    return this.http.post<{ jwt: string, refreshToken: string }>(`${ IP }${ PORT }/renewToken`, {
      refreshToken: this.cookieService.get('jit')
    }, JSON_HEADER);
  }

  logout() {
    this.cookieService.delete('jit');
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getToken() {
    if (!this.getUserId() && this.authToken.length > 20) {
      this.setUserId(jwt_decode(this.authToken).id);
    }

    return this.authToken;
  }

  isAuthenticated() {
    return this.cookieService.get('jit');
  }

  authenticateUser(user: UserModel) {
    return this.http.post<{ jwt: string, refreshToken: string }>(`${ IP }${ PORT }/authenticate`, user, { observe: 'response' })
      .pipe(
        tap((resData) => {
          this.userId = jwt_decode(resData.body.jwt).id;
          this.cookieService.delete('jit');
          this.cookieService.set('jit', resData.body.refreshToken);
          this.setAuthToken(resData.body.jwt);
          this.setFullName(jwt_decode(resData.body.jwt).fullName);
          this.storedUser.next(resData);
        })
      );
  }

  registerUser(user: UserModel) {
    return this.http.post(`http://127.0.0.1:8182/users`, user, JSON_HEADER);
  }
}
