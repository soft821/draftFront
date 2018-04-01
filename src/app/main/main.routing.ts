import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AuthGuard} from '../core/auth/auth-guard.service';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './blog/blog.component';
import {TermsOfUseComponent} from './terms-of-use/terms-of-use.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ResponsiblePlayComponent} from './responsible-play/responsible-play.component';
import {TrustAndSafetyComponent} from './trust-and-safety/trust-and-safety.component';

const MAIN_ROUTES: Routes = [
    {
        path: 'main', component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent }
        ]
    },
    { path: 'blog', component: BlogComponent },
    { path: 'terms-of-use', component: TermsOfUseComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'responsible-play', component: ResponsiblePlayComponent },
    { path: 'trust-and-safety', component: TrustAndSafetyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
