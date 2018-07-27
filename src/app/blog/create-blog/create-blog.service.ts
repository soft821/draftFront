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
  //  console.log(data, 'data')
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
    let images;

    images = this.prepareSections(data.sections, toSend, images);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category.id);
    formData.append('color', data.color._id);
    formData.append('cover_image', data.image);
    formData.append('creator', user);

    formData.append('sections', JSON.stringify(toSend));   
    if(images) {
      formData.append('images', images); 
    }

    new Response(formData).text().then(console.log)

    return this.httpClient.post(`${this.helperService.resolveAPI()}/posts/create`, formData)
    .pipe(
      catchError(this.handleError.handleError)
    )
  }

  prepareSections(sections, sectionToSend, sectionImages) {
    sectionImages = [];
    for(let i=0; i<sections.length; i++) {
      if(sections[i].title && sections[i].subtitle && sections[i].description) {
        let temp = {
          title: sections[i].title,
          subtitle: sections[i].subtitle,
          description: sections[i].description
        }
        sectionToSend.push(temp);
      }
      if(sections[i].image && sections[i].image.file) {
        sectionImages.push({id: i, image: sections[i].image.file.rawFile});
      }
    }
    return sectionImages; 
  }

  convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;  }
}
