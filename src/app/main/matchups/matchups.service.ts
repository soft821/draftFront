import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {HelperService} from '../../core/helper.service';
import {TokenInterceptor} from './../../core/auth/auth-interceptors';

/*
 * AuthService
 * AuthService contains isAuthenticated flag and authenticated user to be shared globally through the application
 * */
@Injectable()
export class MatchupsService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService) {
  }

  // Returning list of available gameTimes with all games for each gameTime
  getUsers() {    
   /*  let body = {
      slate_name: "Early_Sun",
      games: ["game_id_1", "game_id_2"]
    }
    return this.httpClient.post(`${this.helperService.resolveAPI()}/admin/slates`, body)
    .pipe(
      catchError(this.handleError)
    ); */
    
    return this.httpClient.get(`${this.helperService.resolveAPI()}/info/games`)
  }

  getMatchups(param) {
    let params: HttpParams = new HttpParams();
    params = params.append('status', param.status);
    return this.httpClient.get(`${this.helperService.resolveAPI()}/contests`, { params: params });
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
