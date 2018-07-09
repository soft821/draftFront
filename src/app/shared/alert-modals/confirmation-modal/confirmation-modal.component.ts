import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {ResponsiveService} from '../../../core/responsive/responsive.service';
import {CreateContestService} from '../../../main/create-contest/create-contest.service';
import {Observable} from 'rxjs';
import {HelperService} from '../../../core/helper.service';
import {RANK_FILTER_VALUES} from '../../../main/create-contest/select-player/const-values';
import { AuthService } from '../../../core/auth/auth.service';

export interface ConfirmModel {
  title:string;
  message:string;
  description: string;
  showTable: boolean;
  confirmMatchup: boolean;
  confirmMatchupTable: any;
  buttonText: string;
  tableValues: any;
  money: any;
  amount: number;
}

@Component({
  selector: 'fp-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent extends SimpleModalComponent<ConfirmModel, any> implements OnInit, ConfirmModel {
  title: string;
  message:string;
  description: string;
  showTable: boolean;
  confirmMatchup: boolean;
  confirmMatchupTable: any;
  buttonText = 'Yes';
  tableValues: any;
  money: any;
  amount: number;
  loadPlayersTable: boolean;
  showRankFilter: boolean;
  showGameFilter: boolean;
  selectedPlayerId = -1;
  selectedPlayer: any;
  players = [];
  playersUnsorted = [];
  sortFilter = {
    name: true,
    fps: false
  }
  sortDesc = false;
  rankFilterValues: any[];
  filter = {
    tier: [],
    game_id: []
  }
  gameFilterValues = [];

  constructor(public responsiveService: ResponsiveService,
              private createContestService: CreateContestService,
              public authService: AuthService,
              private helperService: HelperService) {
    super();
  }

  ngOnInit() {
    // enter matchup
    if(this.tableValues) { 
      let params = {
        slateId: this.tableValues.slate_id,
        position: this.tableValues.fantasy_player.position
      }
      if(this.tableValues.matchupType === 'tier_ranking') {
        params['tier'] = this.tableValues.fantasy_player.tier;
      }
      Observable.forkJoin([this.createContestService.getFantasyPlayers(params)])
      .subscribe(data => {
        this.players = data[0]['response'];
        if(this.players && this.tableValues && this.tableValues.fantasy_player) {
          // remove opponent from the list
          this.players = this.players.filter(x => x.id !== this.tableValues.fantasy_player.id)
          this.playersUnsorted = [].concat(this.players);
        }        
        this.createContestService.setGameFilterValues(this.players, this.gameFilterValues);        
        this.rankFilterValues = RANK_FILTER_VALUES;      
        this.filter['tier'] = this.rankFilterValues.filter(x => x.selected === true).map(x => x.value);
        this.filter['game_id'] = this.gameFilterValues.filter(x => x.selected === true).map(x => x.id);
        this.loadPlayersTable = true;    
      });
    }   

    // confirm matchup
    if(this.confirmMatchupTable) {
    //  console.log(this.confirmMatchupTable)
    }
  }

  orderBy(isDescending, key) {
    this.sortFilter = this.helperService.setSortFilterProperties(this.sortFilter, key);
    this.sortDesc = isDescending;
      if(!isDescending) {
        this.players.sort(this.helperService.compareValues(key, 'desc'));
     } else {        
      this.players.sort(this.helperService.compareValues(key));
    } 
  }

  filterOptionSelected(value) {
    this.players = this.helperService.filterOptionSelected(value, this.rankFilterValues, this.gameFilterValues, this.filter, this.players, this.playersUnsorted);
  }

  selectPlayer(option) {
    if(this.selectedPlayerId !== option.id) {
      this.selectedPlayer = option;
      this.selectedPlayerId = option.id;
      this.players.filter(x => x.id !== option.id).map(x => x.selected = false);
      this.players.filter(x => x.id === option.id).map(x => x.selected = true);
    } else {
      this.selectedPlayerId = -1;
      this.selectedPlayer = {};
      this.players.map(x => x.selected = false);
    }
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    if(this.showTable) {
      this.result = this.selectedPlayer;
    } else if(this.confirmMatchup) {
      this.result = this.confirmMatchupTable;
    } else {
      this.result = true;
    }
    this.close();
  }

}
