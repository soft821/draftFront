
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ResetComponent} from './reset/reset.component';

const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/admin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'reset-password',
    component: ResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
