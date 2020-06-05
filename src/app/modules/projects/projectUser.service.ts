import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IP, JSON_HEADER, PORT } from '../../constants';
import { UserModel } from '../../models/user.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProjectUserService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  projectUsersChanged = new Subject<Array<UserModel>>();
  currentUsers: Array<UserModel> = [];

  getAllProjectUsers(projectId: number) {
    this.http.get<Array<UserModel>>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/users`, JSON_HEADER)
      .subscribe(res => {
        this.currentUsers = res;
        this.projectUsersChanged.next(this.currentUsers);
      });
  }

  addUserToTheProject(email: string, projectId: number) {
    return this.http.post(`${ IP }${ PORT }/projects/addUser`, { email, projectId }, JSON_HEADER);
  }

  removeUserFromTheProject(projectId: number, userId: number) {
    return this.http.delete(`${ IP }${ PORT }/projects/${ projectId }/users/${ userId }`, JSON_HEADER).toPromise();
  }

  getCurrentUsers() {
    return [...this.currentUsers];
  }
}
