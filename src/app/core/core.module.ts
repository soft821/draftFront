import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './module-loaded-once-guard';
import {AuthenticationModule} from '../authentication/authentication.module';
import {GlobalStateService} from './global-state/global-state.service';
import {MainModule} from '../main/main.module';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../core/auth/auth-interceptors';
//import {FooterComponent} from './footer/footer.component';
import {HelperService} from './helper.service';
//import {ResponsiveService} from './responsive/responsive.service';
//import {RoleGuardService} from './auth/role-guard.service';
/*
 * CoreModule
 * CoreModule is used to gather components, services that we only want to initialize once at the start.
 * So we import CoreModule once when the app starts and never import anywhere else.
 * https://angular.io/docs/ts/latest/guide/ngmodule.html#core-module
 * */
@NgModule({
  imports: [],
  // exports: exports modules other modules may want to use (in our case - App module)
  exports: [
    // Modules
    AuthenticationModule,
    MainModule,
    // Components
    // [FooterComponent]
  ],
  declarations: [
    // FooterComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
     GlobalStateService,
    AuthService,
    HelperService,
    AuthGuard,
    TokenInterceptor
   /* ResponsiveService,
    RoleGuardService */
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
