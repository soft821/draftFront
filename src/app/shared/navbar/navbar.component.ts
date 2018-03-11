import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavComponent {
    
    constructor(private router: Router) {
}
    goToLogin() {
        this.router.navigate(['/login']);
        console.log('login')
    }

    goToSignup() {
        this.router.navigate(['/signup']);
        console.log('signup')
    }
}