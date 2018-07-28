import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  constructor() { }

  convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;  
  }
}
