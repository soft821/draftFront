import {Component, OnInit} from '@angular/core';
import {LobbyService} from './lobby.service';
import {HelperService} from '../../core/helper.service';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Observable} from 'rxjs/Rx';
import {ENTRY_FEE} from '../create-contest/entry-fee/entryFeeValues';
import {ModalHelperService} from '../../core/modal-helper.service';

@Component({
  selector: 'dm-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  pageLoaded: boolean;
  modalOpened: boolean;
  entryFee = ENTRY_FEE;
  slates = [];
  temp: any;
  live: any;
  slateSelected = {};
  gameSelected = {};
  matchupSelected: any;
  liveGames = [];
  gameSelectedUnfiltered = [];
  filterForPositions = [];
  gameFilterValues = [];
  filter = {
    slate_id: [],
    matchupType: [],
    game_id: [],
    position: []
  }
  selectedFeeRange: any;
  enterMatchupList = [];
  enterMatchupListUnfiltered = [];
  headlines = [
    {
      id: 0,
      time: "2017-09-18 20:30:00",
      players: [
        {
          id: 0,
          position: 'RB',
          name: 'David Johnson',
          team1: 'Ari',
          team2: 'Dal'
        },
        {
          id: 1,
          position: 'RB',
          name: 'Ezekiel Elliot',
          team1: 'Ari',
          team2: 'Dal'
        }
      ]      
    },
    {
      id: 1,
      time: "2017-09-14 20:25:00",
      players: [
        {
          id: 0,
          position: 'RB',
          name: 'John Doe',
          team1: 'Ari',
          team2: 'Dal'
        },
        {
          id: 1,
          position: 'RB',
          name: 'Samuel Elliot',
          team1: 'Ari',
          team2: 'Dal'
        }
      ]      
    },
    {
      id: 2,
      time: "2017-09-15 20:25:00",
      players: [
        {
          id: 0,
          position: 'RB',
          name: 'Jane Doe',
          team1: 'Ari',
          team2: 'Dal'
        },
        {
          id: 1,
          position: 'RB',
          name: 'Eric Lee',
          team1: 'Ari',
          team2: 'Dal'
        }
      ]      
    }
  ]
  
  constructor(private lobbyService: LobbyService, 
              private helperService: HelperService,
              private simpleModalService: SimpleModalService,
              public modalHelperService: ModalHelperService) { }

  ngOnInit() {
    this.getData();
  };

  getData() {
    this.helperService.spinner.show();
    Observable.forkJoin([this.lobbyService.getSlates(),
                        this.lobbyService.getMatchups('LOBBY'),
                        this.lobbyService.getMatchups('ENTER_MATCHUP')/* ,
                        this.lobbyService.getMatchups('HISTORY'), 
                        this.lobbyService.getMatchups('MATCHUPS'), 
                        this.lobbyService.getMatchups('ENTER_MATCHUP') */, //this one is probably called for the table on lobby screen
                        ])
    .subscribe(data => {
      this.temp = data[0];
      this.slates = this.temp?this.temp.response:[];
      if(this.slates && this.slates[0]) {
        this.selectSlate(this.slates[0]);
      }
      this.live = data[1];
      this.liveGames = this.live?this.live.response:[];
      this.enterMatchupList = data[2].response;
      this.enterMatchupList.forEach(element => {
        this.entryFee.forEach(fee => {
          if(element.entryFee === fee.value) {
            element.prize = fee.prize;
          }
        });
        // because of filter
        element.position = element.entries[0].fantasy_player.position;
        if(element.matchupType === 'tier_ranking') {
          element.type = 'tier_ranking' + '_' + element.entries[0].fantasy_player.tier;
        } else {
          element.type = element.matchupType;
        }
        element.game_id = element.entries[0].game_id; // not good solution because ignores game id from entries[1]
      });
      this.enterMatchupListUnfiltered = [].concat(this.enterMatchupList);
      this.filterLobbyOptions()
      this.pageLoaded = true;
      this.helperService.spinner.hide();
    }, (error) => {
      this.pageLoaded = true;
      this.helperService.spinner.hide();
      console.log(error)
    });
  };

  
  filterLobbyOptions(entryFee?) {
    let f = {};
    if(this.filter.slate_id && this.filter.slate_id.length) {
      f['slate_id'] = this.filter.slate_id;
    }
    if(this.filter.matchupType && this.filter.matchupType.length) {
      f['type'] = this.filter.matchupType;
    }
    if(this.filter.game_id && this.filter.game_id.length) {
      f['game_id'] = this.filter.game_id;
    }
    if(this.filter.position && this.filter.position.length) {
      f['position'] = this.filter.position;
    }
    this.enterMatchupList = this.helperService.filterListBy(f, this.enterMatchupList, this.enterMatchupListUnfiltered);  

    if(entryFee) {
      this.selectedFeeRange = entryFee;
      let temp = [];
      this.enterMatchupList.forEach(element => {
        if(element.entryFee >= entryFee[0] && element.entryFee <= entryFee[1]) {
          temp.push(element);
        }
      });
      this.enterMatchupList = temp;
    }
  }

  selectEntryFee(entryFee) {
    this.filterLobbyOptions(entryFee);    
  }

  selectSlate(slate) {
    slate.selected = true;
    this.slateSelected = slate;
    if(this.filter.slate_id.length === 0) {
      this.filter.slate_id.push({});
    }
    this.filter.slate_id[0] = this.slateSelected['id'];
    this.slates.forEach(element => {
      if(element.id !== slate.id) {
        element.selected = false;
      }
    });
    this.filterLobbyOptions();
  }

  selectGame(game) {
    game.selected = !game.selected;
    if(game.selected) {
      this.filter.game_id.push(game.id);
    } else {
      let index = this.filter.game_id.findIndex(x => x === game.id);
      if(index !== -1) {
        this.filter.game_id.splice(index, 1);
      }
    }
   this.filterLobbyOptions();
  }

  selectGameType(event) {
    if(this.filter.matchupType.length === 0) {
      this.filter.matchupType.push({});  
    }
    this.filter.matchupType[0] = event.type;
    this.filterLobbyOptions();
  }

  selectPosition(positions) {   
    this.filter.position = positions.filter(x => x.selected === true).map(x => x.name);
    this.filterLobbyOptions()
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        buttonText: 'Enter',
        confirmMatchup: true,
        confirmMatchupTable: event
    })
    .subscribe((isConfirmed) => {
      if(isConfirmed) {
        let temp = {
          contest_id: isConfirmed.id,
          player_id: isConfirmed.entries?isConfirmed.entries[1].fantasy_player.id:-1
        }
        this.lobbyService.enterContest(temp).
        subscribe(response => {
          let index = this.enterMatchupList.findIndex(x => x.id === event.id);
          if(index !== -1) {
            this.enterMatchupList.splice(index, 1);
          }
          let msg = 'You have successfully registered to contest';
          let ttl = 'Thank you'
          this.modalHelperService.showConfirmationMessage(msg, ttl);
        }, 
        error => {
          if(event.matchupType !== 'set_opponent') {
            event.entries.splice(1, 1);
          }          
          this.modalHelperService.showConfirmationMessage(error.message, 'Error', error.debug?error.debug[0]:'');
          this.getData();
        });
      }
      this.modalOpened = false;
      this.helperService.scrollToTopSamePage();
    });
  };

  showEnterMatchupModal(event) {
    this.modalOpened = true;
    // if it is set opponent -> confirm
    if(event.matchupType === 'set_opponent') {
      this.showConfirmModal(event);
    } else { // else -> choose a player than confirm
      event.entries[0].entryFee = event.entryFee;
      event.entries[0].prize = event.prize;
      event.entries[0].matchupType = event.matchupType;
      this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Select Player',
        buttonText: 'Select',
        showTable: true,
        tableValues: event.entries[0]
    })
    .subscribe((isConfirmed)=> {
      if(isConfirmed) {
        // event is contest, has id 
        if(event && event.entries) {
          event.entries.push({});
          event.entries[1].fantasy_player = isConfirmed;
          event.entries[1].game = isConfirmed.game;
        }
        this.showConfirmModal(event);
      } else {
        this.modalOpened = false;
      }      
    });
  }
}

}
