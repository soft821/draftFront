import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HelperService} from '../helper.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

/*
 * AuthService
 * AuthService contains isAuthenticated flag and authenticated user to be shared globally through the application
 * */
@Injectable()
export class AuthService {

  isAuthenticated: boolean;
  authenticatedUser: any;
  osName: string;
  origin = document.location.origin;
  role: string;
  hyperionLink: string;

  constructor(private localStorageService: LocalStorageService,
              private httpClient: HttpClient,
              private helperService: HelperService,
              private router: Router) {
  }

  getToken() {
    return this.localStorageService.get('draftmatch.auth_token');
  }

  setDataAfterLogin(authData, remember?) {
    this.isAuthenticated = true;
    this.authenticatedUser = authData.response;
    this.localStorageService.set('auth_token', authData.response.token);
  }

  checkIsAuthenticated() {
    return new Promise((resolve, reject) => {
    this.httpClient.get(`${this.helperService.resolveAPI()}/user`)
    .toPromise()
      .then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  login(form) {
    const body = {
      email: form.value.email,
      password: form.value.password
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/login`, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(form) {
    const body = {
      email: form.value.email
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/resetPassword`, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  signUp(form) {
    const body = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/register`, body);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
