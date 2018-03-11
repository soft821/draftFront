import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import {ResetComponent} from './reset/reset.component';
import {AuthenticationRoutingModule} from './authentication-routing';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetComponent
  ]
})
export class AuthenticationModule {
}
