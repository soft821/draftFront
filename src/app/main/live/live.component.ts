import {Component, OnInit} from '@angular/core';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import { AuthService } from '../../core/auth/auth.service';
import { ENTRY_FEE } from '../create-contest/entry-fee/entryFeeValues';

@Component({
  selector: 'dm-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              private authService: AuthService) { }

  titles = [
    {
      id: 0,
      title: 'Your Player'
    },
    {
      id: 1,
      title: 'Score'
    },
    {
      id: 2,
      title: 'Opponent'
    },
    {
      id: 3,
      title: 'Score'
    },
    {
      id: 4,
      title: 'Entry'
    },
    {
      id: 5,
      title: 'Winning'
    }
  ]

  tableValues = [
    /* {
      id: 0,
      position: 'QB',
      slate: 'CLE 27 @ SD 30',
      score: 24.58,
      p: 'P',
      team: 'Rivers',
      match: 'Final',
      opponentPosition: 'QB',
      match1: '1st',
      opponent: 'garfield399',
      opponentScore: 22.58,
      entry: 2,
      winning: 5
    },
    {
      id: 1,
      position: 'QB',
      slate: 'CLE 27 @ SD 30',
      score: 24.58,
      p: 'P',
      team: 'Rivers',
      match: 'Final',
      opponentPosition: 'QB',
      match1: '1st',
      opponent: 'garfield399',
      opponentScore: 22.58,
      entry: 2,
      winning: 0
    } */
  ]

  user = {
    username: this.authService.authenticatedUser.username,
    record: 'Record: ' + this.authService.authenticatedUser.wins + ' - ' + this.authService.authenticatedUser.loses + ' (W-L)',
    matchups: 0,
    totalEntries: 0,
    totalWinnings: 0
  }
  tempList: any;
  entryFee = [];

  ngOnInit() {
    this.getData();
    this.entryFee = ENTRY_FEE;
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('LIVE')
    .subscribe( response => {
      this.tempList = response;
      this.tableValues = [];
      if(this.tempList.response) {
        this.tempList.response.forEach(element => {
          if(element.contests && element.contests.length) {
            element.contests.forEach(contest => {
              contest.name = element.name; // name of the slate 
              // players name replace with first letter
              if(contest && contest.entries) {
                contest.entries.forEach(entry => {
                  entry.fantasy_player.name = this.helperService.getPlayer(entry.fantasy_player.name);
                });
              }
              this.entryFee.forEach(fee => {
                if(contest.entryFee === fee.value) {
                  contest.prize = fee.prize;
                }
              });
              this.tableValues.push(contest);
            });
          }            
        }); 
      }   
      console.log(this.tableValues)     
      this.setValuesForUser(this.tempList.userInfo);
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser(userInfo) {
    this.user.matchups = userInfo.entries;
    this.user.totalEntries = userInfo.totalEntry;
    this.tableValues.forEach(element => {
      this.user.totalWinnings += element.prize;
    });
  }

}
