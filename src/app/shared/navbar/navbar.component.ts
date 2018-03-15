import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import { HelperService } from '../../core/helper.service';

@Component({
    selector: 'navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavComponent implements OnInit {
    isBlog = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public auth: AuthService,
                private helperService: HelperService) {}

    ngOnInit() {
      if(this.route) {
        this.route.url.subscribe(url => {
          if(url[0].path === 'blog') {
            this.isBlog = true;
          } else {
            this.isBlog = false;
          }
        });
      }
    }

    goToLogin() {
      this.router.navigate(['/login']);
    }

    goToSignup() {
      this.router.navigate(['/signup']);
    }
}