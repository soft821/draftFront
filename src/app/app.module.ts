import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocalStorageModule} from 'angular-2-local-storage';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app.routing';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    // Angular 2 LocalStorage wrapper
    // https://www.npmjs.com/package/angular-2-local-storage
    LocalStorageModule.withConfig({
      prefix: 'draftmatch',
      storageType: 'localStorage'
    }),
    //https://github.com/auth0/angular2-jwt
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4300']
      }
    })
  ],
  declarations: [
    AppComponent
  ],  
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
