import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LocalStorageService} from 'angular-2-local-storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router, NavigationEnd} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
//import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HelperService {
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private sanitization: DomSanitizer) {}

  resolveAPI() {
    return environment.apiBase;
  }

  decodeBaseUrl(url) {
    let tempSrc = `data:image/png;base64,${url}`;
    return this.sanitization.bypassSecurityTrustResourceUrl(tempSrc);
  }

  disableBodyScroll(stopScrollFix?) {
    let scrollTopPosition = stopScrollFix ? 0 : document.documentElement.scrollTop;
    document.body.style.overflowY = 'scroll';
    document.body.style.position = 'fixed';
    document.body.style.top = - + scrollTopPosition.toString() + 'px';
  }

  enableBodyScroll(stopScrollFix?) {
    let scrollTopPosition = stopScrollFix === true ? '0' : document.body.style.top.replace('px', '').replace('-', '');
    document.body.style.overflowY = 'auto';
    document.body.style.position = 'static';
    document.documentElement.scrollTop = parseInt(scrollTopPosition);
  }

  isArray(obj: any ) {
    return Array.isArray(obj)
  }
}
