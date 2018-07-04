import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {ResponsiveService} from '../../core/responsive/responsive.service';
import {GlobalStateService} from '../../core/global-state/global-state.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
    selector: 'dm-navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavComponent implements OnInit {
  sidebarOpen = false;
  sidebarBalanceOpen = false;
  options = [
    {id: 0, text: 'Contact Support', path: '/'},
    {id: 1, text: 'How to Play', path: '/'},
    {id: 2, text: 'Rules & Score', path: '/'},
    {id: 3, text: 'Training Guide', path: '/'},
    {id: 4, text: 'Responsible Play', path: '/dm/responsible-play'},
    {id: 5, text: 'Trust & Safety', path: '/dm/trust-and-safety'},
    {id: 6, text: 'Terms of Use', path: '/dm/terms-of-use'},
    {id: 7, text: 'Privacy Policy', path: '/dm/privacy-policy'}
  ];

  userOptions = [
    {id: 0, text: 'Withdraw', path: '/main/withdraw'},
    {id: 1, text: 'Transaction History', path: '/'},
    {id: 2, text: 'My Account', path: '/'},
    {id: 3, text: 'Refer Friends', path: '/'},
    {id: 4, text: 'Log Out', path: '/logout'}
  ]
  constructor(private router: Router,
              private globalState: GlobalStateService,
              public auth: AuthService,
              private localStorageService: LocalStorageService,
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
    // since logout should lead to the landing page, the only way to user gets there is to lose auth token 
    if(option.path === '/logout') {
      this.localStorageService.remove('auth_token');
      this.auth.isAuthenticated = false;
      option.path = '/';
    }
    this.router.navigate([option.path]);
  }
}
