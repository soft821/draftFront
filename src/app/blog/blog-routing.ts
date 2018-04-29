
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const AUTHENTICATION_ROUTES: Routes = [
/*   {
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
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
