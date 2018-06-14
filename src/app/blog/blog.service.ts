import { Injectable } from '@angular/core';


@Injectable()
export class BlogService {
//  itemsList: AngularFireList<any>;

  constructor() { }


  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
