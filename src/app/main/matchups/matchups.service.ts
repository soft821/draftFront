import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {TokenInterceptor} from './../../core/auth/auth-interceptors';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable()
export class MatchupsService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService) {
  }

  cancelContest(data) {
    let body = {
      contest_id: data
    }   
    return this.httpClient.post(`${this.helperService.resolveAPI()}/contests/cancel`, body)
    .pipe(
      catchError(this.handleError.handleError)
    )  
  }
}
