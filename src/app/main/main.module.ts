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
import {MatchupsComponent} from './matchups/matchups.component';
import {MatchComponent} from './matchups/match/match.component';
import {GameTimeComponent} from './matchups/game-time/game-time.component';
import {EntryFeeComponent} from './matchups/entry-fee/entry-fee.component';
import {MatchupTypeComponent} from './matchups/matchup-type/matchup-type.component';
import {PlayerPositionComponent} from './matchups/player-position/player-position.component';
import {SelectPlayerComponent} from './matchups/select-player/select-player.component';
import {CreateContestComponent} from './matchups/create-contest/create-contest.component';
import {MatchupsService} from './matchups/matchups.service';

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
    TrustAndSafetyComponent,
    MatchupsComponent,
    MatchComponent,
    GameTimeComponent,
    EntryFeeComponent,
    MatchupTypeComponent,
    PlayerPositionComponent,
    SelectPlayerComponent,
    CreateContestComponent
  ],
  exports: [
    NavComponent,
    BlogComponent
  ],
  providers: [
    MatchupsService
  ],
  entryComponents: [
  ]
})
export class MainModule {
}
