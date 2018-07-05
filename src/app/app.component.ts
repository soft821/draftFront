import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResponsiveService} from './core/responsive/responsive.service';
import { HelperService } from './core/helper.service';

@Component({
  selector: 'dm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  timeout: any;
  
  constructor(private router: Router,
              private responsiveService: ResponsiveService,
              private helperService: HelperService) {}

  ngOnInit() {
    this.responsiveService.setMedia(window.innerWidth);
    this.subscribeCurrentPosition();
  }
 
  subscribeCurrentPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        (position) => {
          let myLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          this.helperService.locationData = myLocation;
        }, (error) => {
          console.log('Geolocation error: '+ error.message);
        });
      } else {
        console.log('Geolocation not supported in this browser');
    }
  } 

  goToLogin() {
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize', ['$event'])
  resize(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.responsiveService.setMedia(e.target.innerWidth);
    }, 5);
  }
}
