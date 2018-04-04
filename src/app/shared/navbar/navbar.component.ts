import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {HelperService} from '../../core/helper.service';
import {ResponsiveService} from '../../core/responsive/responsive.service';
import {GlobalStateService} from '../../core/global-state/global-state.service';

@Component({
    selector: 'dm-navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavComponent implements OnInit {
    sidebarOpen = false;
    constructor(private router: Router,
                private globalState: GlobalStateService,
                public auth: AuthService,
                private helperService: HelperService,
                public responsiveService: ResponsiveService) {
                  this.globalState.subscribe('menu.closed', (data) => {
                    this.sidebarOpen = data.value;
                  });
                }

    ngOnInit() {
      console.log(this.auth.authenticatedUser)
      this.auth.authenticatedUser.balance = 254.23654
    }

    goToLogin() {
      this.router.navigate(['/login']);
    }

    goToSignup() {
      this.router.navigate(['/signup']);
    }

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      this.globalState.notifyDataChanged('menu.toggleSidebar', {value: this.sidebarOpen});
    }
}
