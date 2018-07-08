import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {HandleErrorService} from '../../core/handle-error.service';
import {AuthService} from '../../core/auth/auth.service';

@Injectable()
export class CreateBlogService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService,
              private authService: AuthService) {
  }

  createBlog(data) {
    console.log(data, 'data')
    let formData: FormData = new FormData();
    let tempUser = this.authService.authenticatedUser;
    let user;
    if(tempUser) {
      user = {
        id: tempUser.id,
        name: tempUser.name,
        username: tempUser.username
      }
    }
    let toSend = [];
    let images = [];
    this.prepareSections(data.sections, toSend, images);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category.value);
    formData.append('color', data.color._id);
    formData.append('cover_image', data.image);
    formData.append('url', data.url);
    formData.append('creator', user);
  //  formData.append('sections', JSON.stringify(data.sections));   
   /*  return this.httpClient.post(`${this.helperService.resolveAPI()}/contests`, body)
    .pipe(
      catchError(this.handleError.handleError)
    )   */
  }

  prepareSections(sections, sectionToSend, sectionImages) {
    for(let i=0; i<sections.length; i++) {
      let temp = {
        title: sections[i].title,
        subtitle: sections[i].subtitle,
        description: sections[i].description
      }
      sectionToSend.push(temp);
      sectionImages.push({id: i, image: sections[i].image.file.rawFile});
    }
  }

  convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;  }
}
