import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IP, JSON_HEADER, PORT } from '../../constants';
import { PieChartStatisticsModel } from '../../models/PieChartStatistics.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProjectStatisticsService {

  pieStatisticsChanged = new Subject<PieChartStatisticsModel>();
  private currentPieStatistics: PieChartStatisticsModel;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  fetchPieStatistics(userId: number, projectId: number) {
    this.http.get<PieChartStatisticsModel>
    (`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/statistics`, JSON_HEADER)
      .toPromise()
      .then(result => {
        this.currentPieStatistics = result;
        this.pieStatisticsChanged.next(result);
      });
  }

}
