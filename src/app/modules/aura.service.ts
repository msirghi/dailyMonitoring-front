import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IP, PORT } from '../constants';

@Injectable()
export class AuraService {

  auraChanged = new Subject<AuraModel>();
  currentAura: AuraModel;

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  fetchUserAura() {
    this.http.get<AuraModel>(`${ IP }${ PORT }/users/${ this.auth.getUserId() }/aura`)
      .subscribe(res => {
        this.currentAura = res;
        this.auraChanged.next(res);
      });
  }

  getUserAura() {
    return this.currentAura;
  }
}
