import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalStateService} from "../core/global-state/global-state.service";
import {ResponsiveService} from '../core/responsive/responsive.service';

@Component({
  selector: 'fp-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  isSidebarOpen: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private globalState: GlobalStateService,
              public responsiveService: ResponsiveService
            ) {
    this.globalState.subscribe('menu.toggleSidebar', (data) => {
      if (!data.value) {
        this.isSidebarOpen = false;
        this.globalState.notifyDataChanged('menu.closed', 
          {value: this.isSidebarOpen});
      }
      this.isSidebarOpen = data.value;
    }); 

    this.globalState.subscribe('menu.closed', (data) => {
      this.isSidebarOpen = data.value;
    }); 
  
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((data) => {
      //  this.navbarTitle = data.translate_key;       
      });
  
      this.router.events
      .filter(event => {
        return event instanceof NavigationEnd
      })
      .subscribe(e => {
      //   this.currentRoute = this.router.url;
      });
    } 
  
    ngOnInit() {
      // https://toddmotto.com/passing-data-angular-2-components-input
      
    }
  }
  