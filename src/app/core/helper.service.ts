import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LocalStorageService} from 'angular-2-local-storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router, NavigationEnd} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
// import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HelperService {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private sanitization: DomSanitizer) {}

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
}
