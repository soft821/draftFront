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
      title: 'Your Player',
      titleXs: 'Your Player',
      visibleXs: true
    },
    {
      id: 1,
      title: 'Score',
      titleXs: 'Score',
      visibleXs: true
    },
    {
      id: 2,
      title: 'Opponent',
      titleXs: 'Opponent',
      visibleXs: true
    },
    {
      id: 3,
      title: 'Score',
      titleXs: 'Score',
      visibleXs: true
    },
    {
      id: 4,
      title: 'Entry',
      titleXs: 'E/W',
      visibleXs: true
    },
    {
      id: 5,
      title: 'Winning',
      titleXs: '',
      visibleXs: false
    }
  ]

  tableValues = []

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
    this.helperService.scrollToTop();
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
