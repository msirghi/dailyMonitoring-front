import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UserActivityStatisticsModel } from '../../models/userActivityStatistics.model';
import { IP, JSON_HEADER, PORT } from '../../constants';

@Injectable()
export class DashboardStatisticsService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  fetchDashboardStatistics() {
    return this.http.get<UserActivityStatisticsModel>(
      `${ IP }${ PORT }/users/${ this.authService.getUserId() }/statistics`, JSON_HEADER);
  }

}
