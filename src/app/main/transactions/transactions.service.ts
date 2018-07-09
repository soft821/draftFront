import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable()
export class TransactionsService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService) {
  }

  getTransactions() {    
    return this.httpClient.get(`${this.helperService.resolveAPI()}/user/transactions`)
    .pipe(
      catchError(this.handleError.handleError)
    );
  }
}
