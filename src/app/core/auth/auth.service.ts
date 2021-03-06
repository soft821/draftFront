import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../helper.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {catchError} from 'rxjs/operators';
import {HandleErrorService} from '../handle-error.service';

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
              private router: Router,
              private handleError: HandleErrorService) {
  }

  getToken() {
    return this.localStorageService.get('draftmatch.auth_token');
  }

  getCheckbookToken() {
    return this.localStorageService.get('checkbook_token');
  }

  setCheckbookToken(flag: boolean){
    console.log(flag);
    this.localStorageService.set('checkbook_token', flag);
  }

  getUserId() {
    return this.localStorageService.get('user_id');
  }

  setDataAfterLogin(authData, remember?) {
    this.isAuthenticated = true;
    this.authenticatedUser = authData.response;
    this.localStorageService.set('auth_token', authData.response.token);
    this.localStorageService.set('user_id', authData.response.id);
    this.localStorageService.set('checkbook_token', authData.response.hasToken);
    
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
      catchError(this.handleError.handleError)
    );
  }

  resetPassword(form) {
    const body = {
      email: form.value.email
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/resetPassword`, body)
    .pipe(
      catchError(this.handleError.handleError)
    );
  }

  signUp(form) {
    const body = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      promocode: form.value.promoCode
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/register`, body)
    .pipe(
      catchError(this.handleError.handleError)
    );  
  }

  checkUserHasCheckbookToken(token){
    const body = {
      time: token,
    };
    return this.httpClient.post(`${this.helperService.resolveAPI()}/auth/checkbook`, body)
    .pipe(
        catchError(this.handleError.handleError)
      );
  }
}
