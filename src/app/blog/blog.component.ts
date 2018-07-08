import {Component, OnInit} from '@angular/core';
import {GlobalStateService} from '../core/global-state/global-state.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ResponsiveService} from '../core/responsive/responsive.service';
import {HelperService} from '../core/helper.service';

@Component({
  selector: 'dm-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  isSidebarOpen: boolean;

  constructor(private globalState: GlobalStateService,
              private activatedRoute: ActivatedRoute,
              public responsiveService: ResponsiveService,
              private router: Router,
              private helperService: HelperService) { 

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
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .map(route => route.data) //mergeMap
      .subscribe((data) => {
      });
      this.router.events
     .filter(event => {
       return event instanceof NavigationEnd;
     })
    .subscribe(e => {});
  }

  ngOnInit() {
    this.helperService.scrollToTopSamePage();
  }

}
