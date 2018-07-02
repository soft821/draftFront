import {Component, OnInit} from '@angular/core';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import {AuthService} from '../../core/auth/auth.service';
import {ENTRY_FEE} from '../create-contest/entry-fee/entryFeeValues';

@Component({
  selector: 'dm-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              private authService: AuthService) { }

  titles = [
    {
      id: 0,
      title: 'Date'
    },
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

  tableValues = [];

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
    this.lobbyService.getMatchups('HISTORY')
    .subscribe( response => {
      this.tempList = response;
      this.tableValues = [];
      if(this.tempList.response) { // different structure 
        this.tempList.response.forEach(element => {        
          element.name = element.slate.name; // name of the slate 
          // players name replace with first letter
          if(element.entries) {
            element.entries.forEach(entry => {
              entry.fantasy_player.name = this.helperService.getPlayer(entry.fantasy_player.name);
            });
          }
          this.entryFee.forEach(fee => {
            if(element.entryFee === fee.value) {
              element.prize = fee.prize;
            }
          });
          this.tableValues.push(element);    
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
