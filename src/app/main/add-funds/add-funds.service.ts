import {Injectable} from '@angular/core';
import {HandleErrorService} from '../../core/handle-error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HelperService} from '../../core/helper.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AddFundsService {

  constructor(private handleError: HandleErrorService,
              private httpClient: HttpClient,
              private helperService: HelperService) { }

  addFundsCoinbase(data) {
    // data.lat = '38.561457';
    // data.lang = '-121.5829971';
    let params: HttpParams = new HttpParams();
    params = params.append('amount', data.amount);
    params = params.append('lat', data.lang);
    params = params.append('lang', data.lat);
    return this.httpClient.post(`${this.helperService.resolveAPI()}/user/addFunds`, params)
    .pipe(
      catchError(this.handleError.handleError)
    )  
  } 

  addFundsCheckbook(data){

    let params: HttpParams = new HttpParams();
    params = params.append('amount', data.amount);
    params = params.append('lat', data.lang);
    params = params.append('lang', data.lat);
    return this.httpClient.post(`${this.helperService.resolveAPI()}/user/addFunds/checkbook`, params)
    .pipe(
      catchError(this.handleError.handleError)
    ) 

  }
}
