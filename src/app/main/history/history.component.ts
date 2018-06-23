import {Component, OnInit} from '@angular/core';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import { AuthService } from '../../core/auth/auth.service';

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

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('HISTORY')
    .subscribe( response => {
      console.log(response)
      this.tempList = response;
      this.tableValues = [];
      if(this.tempList.response)
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
            this.tableValues.push(contest);
          });
        }            
      }); 
      this.setValuesForUser(this.tempList.userInfo);
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser(userInfo) {
    this.user.matchups = userInfo.entries;
    this.user.totalEntries = userInfo.totalEntry;
    // get this from user info on response???
    this.tableValues.forEach(element => {
      this.user.totalWinnings += element.winning;
    });
  }
}
