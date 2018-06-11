import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AuthGuard} from '../core/auth/auth-guard.service';
import {AuthorizedCheck} from '../core/auth/authorized-check.service';
import {MainComponent} from './main.component';
import {TermsOfUseComponent} from './terms-of-use/terms-of-use.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ResponsiblePlayComponent} from './responsible-play/responsible-play.component';
import {TrustAndSafetyComponent} from './trust-and-safety/trust-and-safety.component';
import {MatchupsComponent} from './matchups/matchups.component';
import {LobbyComponent} from './lobby/lobby.component';
import {LiveComponent} from './live/live.component';
import {HistoryComponent} from './history/history.component';
import {CreateContestComponent} from './create-contest/create-contest.component';

const MAIN_ROUTES: Routes = [
    {
        path: 'main', component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'matchups', component: MatchupsComponent },
            { path: 'create-contest', component: CreateContestComponent },
            { path: 'live', component: LiveComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'lobby', component: LobbyComponent }
        ]
    },
    {   
        path: '',  component: MainComponent,
        canActivate: [AuthorizedCheck],
        children: [
            { path: 'terms-of-use', component: TermsOfUseComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'responsible-play', component: ResponsiblePlayComponent },
            { path: 'trust-and-safety', component: TrustAndSafetyComponent },
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
