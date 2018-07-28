import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../core/helper.service';
import {catchError} from '../../../../node_modules/rxjs/operators';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailsService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService) { }

  getBlogDetails(id) {
    return this.httpClient.get(`${this.helperService.resolveAPI()}/posts/${id}`)
    .pipe(
      catchError(this.handleError.handleError)
    );
  }
}
