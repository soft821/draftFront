import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {GlobalStateService} from '../../core/global-state/global-state.service';
import {SIDEBAR_MENU_1, SIDEBAR_MENU_2} from './menu-items';
import {AuthService} from '../../core/auth/auth.service';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Router} from '@angular/router';
import {HelperService} from '../../core/helper.service';

// declare var $;

@Component({
  selector: 'dm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuListItemsAnimation', [
      state('begin', style({
        transform: 'translateY(300px)',
        opacity: '0'
      })),
      state('end', style({
        transform: 'translateY(0)',
        opacity: '1'
      })),
      transition('begin <=> end', animate('400ms ease-in')),
    ])
  ]
})
export class MenuComponent implements OnInit {

  isOpen: boolean;
  sidebarHeight;
  menu_items_1: any[];
  menu_items_2: any[];
  menuListItemsAnimationState: string;

  constructor(private globalState: GlobalStateService,
              private elementRef: ElementRef,
              public auth: AuthService,
              private helperService: HelperService,
              private router: Router) {
  }

  ngOnInit() {
    this.menu_items_1 = SIDEBAR_MENU_1;
    this.menu_items_2 = SIDEBAR_MENU_2;
    this.triggerAnimation();
    this.helperService.disableBodyScroll();
  }

  private triggerAnimation() {
    this.menuListItemsAnimationState = 'begin';

    setTimeout(() => {
      this.menuListItemsAnimationState = 'end';
    }, 0);
  }

  closeSidebar() {
    this.isOpen = false;
    this.globalState.notifyDataChanged('menu.closed', {value: this.isOpen});
    this.helperService.enableBodyScroll();
  }

  @HostListener('document:click', ['$event.target'])
  onOutsideClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const menuBars = document.getElementById('sidebar-bars');
    const menuBarsIcon = document.getElementById('sidebar-bars-icon');
    if (!clickedInside && ((targetElement !== menuBars) && (targetElement !== menuBarsIcon))) {
      this.globalState.notifyDataChanged('menu.closed', {value: false});
      this.helperService.enableBodyScroll();
    }
  }
}
