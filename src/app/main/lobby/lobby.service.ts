import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {TokenInterceptor} from './../../core/auth/auth-interceptors';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable()
export class LobbyService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService) {
  }


  getSlates() {    
    return this.httpClient.get(`${this.helperService.resolveAPI()}/slates`)
    .pipe(
      catchError(this.handleError.handleError)
    );
  }

  getMatchups(status) {
    let params: HttpParams = new HttpParams();
    params = params.append('status', status);
    return this.httpClient.get(`${this.helperService.resolveAPI()}/contests`, { params: params })
    .pipe(
      catchError(this.handleError.handleError)
    );;
  }

  enterContest(data) {
    let body = {
      contest_id: data.contest_id,
      player_id: data.player_id
    }   
    return this.httpClient.post(`${this.helperService.resolveAPI()}/contests/enter`, body)
    .pipe(
      catchError(this.handleError.handleError)
    )  
  }
}
