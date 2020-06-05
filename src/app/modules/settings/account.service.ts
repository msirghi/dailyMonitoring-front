import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInfoModel } from '../../models/userInfo.model';
import { Subject } from 'rxjs';
import { IP, PORT } from '../../constants';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AccountService {

  userInfoChanged = new Subject<UserInfoModel>();

  private userInfo: UserInfoModel;

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  getUserInfo() {
    return this.userInfo;
  }

  fetchUserInfo() {
    this.http.get<UserInfoModel>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }`)
      .subscribe(value => {
        this.userInfo = value;
        this.userInfoChanged.next(value);
      });
  }

  updateUserInfo(updatedInfo: UserInfoModel) {
    return this.http.put<UserInfoModel>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }`, { ...updatedInfo })
      .pipe(
        map(value => {
          this.userInfo = value;
          this.userInfoChanged.next(value);
          this.authService.fetchAccessToken()
            .subscribe((result) => {
              this.authService.setAuthToken(result.jwt);
              this.authService.setFullName(jwt_decode(result.jwt).fullName);
            });
        }));
  }
}
