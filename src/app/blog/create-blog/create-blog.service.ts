import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable()
export class CreateBlogService {

  constructor(private httpClient: HttpClient,
    private helperService: HelperService,
    private handleError: HandleErrorService) {
  }

  createBlog(data) {
    let formData: FormData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category.value);
    formData.append('color', data.color._id);
    formData.append('cover_image', data.image);
    formData.append('url', data.url);
    formData.append('sections', JSON.stringify(data.sections));


    console.log(formData, 'formData')
   /*  return this.httpClient.post(`${this.helperService.resolveAPI()}/contests`, body)
    .pipe(
      catchError(this.handleError.handleError)
    )   */
  }

  convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;  }
}
