import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../UserModel';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  authenticateUser(user: UserModel) {
    return this.http.post('http://localhost:8081/authenticate', user);
  }
}
