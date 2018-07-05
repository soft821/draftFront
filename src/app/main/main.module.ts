import {NgModule} from '@angular/core';
import {DragScrollModule} from 'ngx-drag-scroll';
import {NouisliderModule} from 'ng2-nouislider';
import {SharedModule} from '../shared/shared.module';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main.routing';
import {TermsOfUseComponent} from './terms-of-use/terms-of-use.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ResponsiblePlayComponent} from './responsible-play/responsible-play.component';
import {TrustAndSafetyComponent} from './trust-and-safety/trust-and-safety.component';
import {MatchupsComponent} from './matchups/matchups.component';
import {CreateContestComponent} from './create-contest/create-contest.component';
import {CreateContestService} from './create-contest/create-contest.service';
import {MatchComponent} from './create-contest/match/match.component';
import {SlateComponent} from './create-contest/slate/slate.component';
import {EntryFeeComponent} from './create-contest/entry-fee/entry-fee.component';
import {MatchupTypeComponent} from './create-contest/matchup-type/matchup-type.component';
import {PlayerPositionComponent} from './create-contest/player-position/player-position.component';
import {SelectPlayerComponent} from './create-contest/select-player/select-player.component';
import {OverviewContestComponent} from './create-contest/overview-contest/overview-contest.component';
import {MatchupsService} from './matchups/matchups.service';
import {LobbyComponent} from './lobby/lobby.component';
import {LobbyService} from './lobby/lobby.service';
import {DmCarouselComponent} from './lobby/dm-carousel/dm-carousel.component';
import {DmFilterColumn} from './lobby/filter-column/filter-column.component';
import {HeadlineMatchup} from './lobby/headline-matchup/headline-matchup.component';
import {MatchupTable} from './lobby/matchup-table/matchup-table.component';
import {LiveComponent} from './live/live.component';
import {HistoryComponent} from './history/history.component';
import {DmTable} from '../shared/components/dm-table/dm-table.component';
import {DmSummary} from '../shared/components/dm-summary/dm-summary.component';
import {SlateFilterComponent} from './lobby/slate-filter/slate-filter.component';
import {EnterMatchupComponent} from './enter-matchup/enter-matchup.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AddFundsComponent} from './add-funds/add-funds.component';
import {AddFundsService} from './add-funds/add-funds.service';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {WithdrawService} from './withdraw/withdraw.service';
import {FundsComponent} from './funds/funds.component';

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule.forRoot(),
    DragScrollModule,
    NouisliderModule,
    NgxSpinnerModule
  ],
  declarations: [
    MainComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ResponsiblePlayComponent,
    TrustAndSafetyComponent,
    MatchupsComponent,
    CreateContestComponent,
    MatchComponent,
    SlateComponent,
    EntryFeeComponent,
    MatchupTypeComponent,
    PlayerPositionComponent,
    SelectPlayerComponent,
    OverviewContestComponent,
    LobbyComponent,
    DmCarouselComponent,
    DmFilterColumn,
    HeadlineMatchup,
    MatchupTable,
    LiveComponent,
    HistoryComponent,
    DmTable,
    DmSummary,
    SlateFilterComponent,
    EnterMatchupComponent,
    AddFundsComponent,
    WithdrawComponent,
    FundsComponent
  ],
  exports: [
  ],
  providers: [
    MatchupsService,
    LobbyService,
    CreateContestService,
    AddFundsService,
    WithdrawService
  ],
  entryComponents: [
  ]
})
export class MainModule {
}
