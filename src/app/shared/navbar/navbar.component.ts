import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  sidebarBalanceOpen = false;
  options = [
    {id: 0, text: 'Contact Support', path: '/home'},
    {id: 1, text: 'How to Play', path: '/home'},
    {id: 2, text: 'Rules & Score', path: '/home'},
    {id: 3, text: 'Training Guide', path: '/home'},
    {id: 4, text: 'Responsible Play', path: '/responsible-play'},
    {id: 5, text: 'Trust & Safety', path: '/trust-and-safety'},
    {id: 6, text: 'Terms of Use', path: '/terms-of-use'},
    {id: 7, text: 'Privacy Policy', path: '/privacy-policy'}
  ];

  userOptions = [
    {id: 0, text: 'Log Out', path: '/login'}
  ]
  constructor(private router: Router,
              private globalState: GlobalStateService,
              public auth: AuthService,
              private helperService: HelperService,
              public responsiveService: ResponsiveService) {
                this.globalState.subscribe('menu.closed', (data) => {
                  this.sidebarOpen = data.value;
                });
                this.globalState.subscribe('menu.balanceClosed', (data) => {
                  this.sidebarBalanceOpen = data.value;
                });
              }

  ngOnInit() {
   // this.auth.authenticatedUser.balance = 254.23654
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

  toggleBalanceMenu() {
    this.sidebarBalanceOpen = !this.sidebarBalanceOpen;
    this.globalState.notifyDataChanged('menu.toggleBalanceMenu', {value: this.sidebarBalanceOpen});
  }

  goToRoute(option) {
    this.router.navigate([option.path]);
  }
}
