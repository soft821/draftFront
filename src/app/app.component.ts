import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dm';

  constructor(private router: Router) 
  {}

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
