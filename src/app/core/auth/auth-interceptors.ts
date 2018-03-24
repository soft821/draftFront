import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Baerer ${token}`
        }
      });
    }
    return next.handle(req);
  }

  getToken() {
    let token = localStorage.getItem('draftmatch.auth_token');
    if (token) {
      token = JSON.parse(token);
    }
    return token;
  }
}
