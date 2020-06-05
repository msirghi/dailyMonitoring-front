import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../modules/auth/auth.service';
import { Observable } from 'rxjs';
import { delay, retry, retryWhen } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefetching = false;

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken() && this.auth.isTokenExpired() && !this.isRefetching) {
      this.isRefetching = true;
      this.auth.fetchAccessToken().subscribe((result) => {
        this.auth.setAuthToken(result.jwt);
        this.isRefetching = false;
      });
    }
    if (this.auth.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ this.auth.getToken() }`
        }
      });
    }
    return next.handle(request).pipe(
      // retryWhen(errors => errors.pipe(
      //   retry(2),
      //   delay(2000)
      // ))
    );
  }
}
