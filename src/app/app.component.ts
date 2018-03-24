import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResponsiveService} from './core/responsive/responsive.service';

@Component({
  selector: 'dm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  timeout: any;
  constructor(private router: Router,
              private responsiveService: ResponsiveService) {}

  ngOnInit() {
   this.responsiveService.setMedia(window.innerWidth);
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
