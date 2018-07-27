import {Injectable} from '@angular/core';
import {HandleErrorService} from '../../core/handle-error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HelperService} from '../../core/helper.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class WithdrawService {

  constructor(private handleError: HandleErrorService,
              private httpClient: HttpClient,
              private helperService: HelperService) { }

  withdrawFundsCoinbase(data) {
    let params: HttpParams = new HttpParams();
    params = params.append('amount', data.amount);
    params = params.append('lat', data.lang);
    params = params.append('lang', data.lat);
    return this.httpClient.post(`${this.helperService.resolveAPI()}/user/withdrawFunds`, params)
    .pipe(
      catchError(this.handleError.handleError)
    )  
  }

  withdrawFundsCheckbook(data) {
    let params: HttpParams = new HttpParams();
    params = params.append('amount', data.amount);
    params = params.append('lat', data.lang);
    params = params.append('lang', data.lat);
    return this.httpClient.post(`${this.helperService.resolveAPI()}/user/withdrawFunds/checkbook`, params)
    .pipe(
      catchError(this.handleError.handleError)
    )
  }
}
