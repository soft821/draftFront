import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    return this.authService.checkIsAuthenticated()
      .then((data: any) => {
        this.authService.authenticatedUser = data.response;
        console.log(this.authService.authenticatedUser)
        this.authService.isAuthenticated = true;
        return true;
      }).catch(error => {
        this.authService.isAuthenticated = false;
        this.router.navigate(['/']);
        return false;
      });
  }

  checkIsAuthorized(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    return this.authService.checkIsAuthenticated()
      .then((data: any) => {
        this.authService.authenticatedUser = data.response;
        this.authService.isAuthenticated = true;
        return true;
      }).catch(error => {
        this.authService.isAuthenticated = false;
        return false;
      });
    }
}
