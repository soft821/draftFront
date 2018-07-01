import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthorizedCheck implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
//this one is because of navigation on terms/privacy etc (user does not have to be loged in to see them, but navigation is different if it is not logged in)
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    return this.authService.checkIsAuthenticated()
      .then((data: any) => {
        this.authService.authenticatedUser = data.response;
        this.authService.isAuthenticated = true;
        return true;
      }).catch(error => {
        this.authService.isAuthenticated = false;
        return true;
      });
  }
}

// this one is to prevent logged user to go on landing page
@Injectable()
export class IsUserLogged implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    return this.authService.checkIsAuthenticated()
      .then((data: any) => {
        this.authService.authenticatedUser = data.response;
        this.authService.isAuthenticated = true;
        this.router.navigate(['main/lobby']);
        return true;
      }).catch(error => {
        this.authService.isAuthenticated = false;
        return true;
      });
  }
}
