import {Injectable} from '@angular/core';

@Injectable()
export class ResponsiveService {
  public media = {
    visibleLg: false,
    visibleMd: false,
    visibleSm: false,
    visibleXs: false
  };

  constructor() {
  }

  setMedia(width) {
    let selected;
    if (width >= 1200) {
      this.media.visibleLg = true;
      selected = 'visibleLg';
    }
    if (width >= 992 && width <= 1199) {
      this.media.visibleMd = true;
      selected = 'visibleMd';
    }
    if (width >= 768 && width <= 991) {
      this.media.visibleSm = true;
      selected = 'visibleSm';
    }
    if (width <= 767) {
      this.media.visibleXs = true;
      selected = 'visibleXs';
    }
    this.clearUnselected(selected);
  }

  clearUnselected(selected) {
    for (const prop in this.media) {
      if (this.media.hasOwnProperty(prop) && prop !== selected) {
        this.media[prop] = false;
      }
    }
  }

  checkXxs() {
    if (window.innerWidth <= 320) {
      return true;
    } else {
      return false;
    }
  }
  checkXs() {
    if (window.innerWidth <= 540) {
      return true;
    } else {
      return false;
    }
  }
}
