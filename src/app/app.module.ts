import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {NavComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {LoginComponent} from './authentication/login/login.component';
import {ResetComponent} from './authentication/reset/reset.component';
import {SignupComponent} from './authentication/signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    ResetComponent,
    SignupComponent
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
