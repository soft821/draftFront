import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LocalStorageService} from 'angular-2-local-storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router, NavigationEnd} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
// import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HelperService {
  emailPattern = '';
  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private sanitization: DomSanitizer,
              public spinner: NgxSpinnerService) {}

  resolveAPI() {
    return environment.apiBase;
  }

  isArray(obj: any ) {
    return Array.isArray(obj);
  }

  scrollToTop() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  scrollToTopSamePage() {
    window.scrollTo(0, 0);
  }
  
  scrollToTarget(el) {
    el.scrollIntoView();
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
  
  // function for dynamic sorting
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0; 
      }

      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}
