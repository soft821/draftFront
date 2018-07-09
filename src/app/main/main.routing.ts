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
import {AddFundsComponent} from './add-funds/add-funds.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {ReferFriendsComponent} from './refer-friends/refer-friends.component';
import {ContactSupportComponent} from './contact-support/contact-support.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {RulesAndScoringComponent} from './rules-and-scoring/rules-and-scoring.component';

const MAIN_ROUTES: Routes = [
    {
        path: 'main', component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'lobby', pathMatch: 'full'},
            { path: 'matchups', component: MatchupsComponent },
            { path: 'create-contest', component: CreateContestComponent },
            { path: 'live', component: LiveComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'add-funds', component: AddFundsComponent },
            { path: 'withdraw', component: WithdrawComponent },
            { path: 'contact-support', component: ContactSupportComponent },
            { path: 'transactions', component: TransactionsComponent },
            { 
                canActivate: [AuthGuard], // to refresh the data on the navbar after create contest
                path: 'lobby', 
                component: LobbyComponent 
            }
        ]
    },
    {   
        path: 'dm',  component: MainComponent,
        canActivate: [AuthorizedCheck],
        children: [
            { path: 'terms-of-use', component: TermsOfUseComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'responsible-play', component: ResponsiblePlayComponent },
            { path: 'trust-and-safety', component: TrustAndSafetyComponent },
            { path: 'refer-friends', component: ReferFriendsComponent },
            { path: 'rules-and-scoring', component: RulesAndScoringComponent }
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
