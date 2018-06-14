import {Component, OnInit} from '@angular/core';
import {LobbyService} from './lobby.service';
import {HelperService} from '../../core/helper.service';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'dm-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  pageLoaded: boolean;
  modalOpened: boolean;
  slates = [];
  temp: any;
  live: any;
  slateSelected = {};
  gameSelected = {};
  liveGames = [];
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
              private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.getData();
  };

  getData() {
    this.helperService.spinner.show();
    Observable.forkJoin([this.lobbyService.getSlates(),
                        this.lobbyService.getMatchups('LIVE')/* ,
                        this.lobbyService.getMatchups('HISTORY'), 
                        this.lobbyService.getMatchups('MATCHUPS'), 
                        this.lobbyService.getMatchups('ENTER_MATCHUP') */,
                        ])
    .subscribe(data => {
      this.temp = data[0];
      this.slates = this.temp?this.temp.response:[];
      if(this.slates && this.slates[0]) {
        this.selectSlate(this.slates[0]);
      }
      this.live = data[1];
      this.liveGames = this.live?this.live.response:[];
      this.pageLoaded = true;
      this.helperService.spinner.hide();
    }, (error) => {
    });
  };
  
  selectSlate(slate) {
    slate.selected = true;
    this.slateSelected = slate;
    this.slates.forEach(element => {
      if(element.id !== slate.id) {
        element.selected = false;
      }
    });
    if(slate && slate.games && slate.games.length) {
      this.selectGame(slate.games[0]);
    }
  }

  selectGame(game) {
    game.selected = true;
    this.gameSelected = game;
 /*    this.games.forEach(element => {
      if(element.id !== game.id) {
        element.selected = false;
      }
    }); */
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    let disposable = this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        buttonText: 'Enter',
        setOpponent: true
    })
    .subscribe((isConfirmed)=>{
      this.modalOpened = false;
    });
  }

}
