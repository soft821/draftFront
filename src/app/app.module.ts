import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocalStorageModule} from 'angular-2-local-storage';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule, HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './core/footer/footer.component';
import {SimpleModalModule} from 'ngx-simple-modal';
import {AdsenseModule} from 'ng2-adsense';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SimpleModalModule,
    // Angular 2 LocalStorage wrapper
    // https://www.npmjs.com/package/angular-2-local-storage
    LocalStorageModule.withConfig({
      prefix: 'draftmatch',
      storageType: 'localStorage'
    }),
    // https://github.com/auth0/angular2-jwt
    // https://github.com/auth0/angular-jwt
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4300']
      }
    }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2173766795435813',
      adSlot: 8280455095,
    })
    
  ],
  declarations: [
    AppComponent,
    FooterComponent
  ],
  providers: [
    HttpClient
  ],
  exports: [
    AdsenseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
