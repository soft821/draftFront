import {Injectable} from '@angular/core';
import {HandleErrorService} from '../../core/handle-error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HelperService} from '../../core/helper.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ContactSupportService {

  constructor(private handleError: HandleErrorService,
              private httpClient: HttpClient,
              private helperService: HelperService) { }

  contactSupport(data) {
    console.log(data)
    return this.httpClient.post(`${this.helperService.resolveAPI()}/help/contactSupport`, data)
    .pipe(
      catchError(this.handleError.handleError)
    )   
  } 
}
  