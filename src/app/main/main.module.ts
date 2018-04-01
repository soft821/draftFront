import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main.routing';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './../shared/navbar/navbar.component';
import {BlogComponent} from './blog/blog.component';
import {MenuComponent} from './menu/menu.component';
import {TermsOfUseComponent} from './terms-of-use/terms-of-use.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ResponsiblePlayComponent} from './responsible-play/responsible-play.component';
import {TrustAndSafetyComponent} from './trust-and-safety/trust-and-safety.component';

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    NavComponent,
    BlogComponent,
    MenuComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ResponsiblePlayComponent,
    TrustAndSafetyComponent
  ],
  exports: [
    NavComponent,
    BlogComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class MainModule {
}
