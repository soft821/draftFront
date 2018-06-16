import {Component, OnInit} from '@angular/core';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService) { }

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
    username: 'Username',
    record: 'Record: 1345 - 234 (W-L)',
    matchups: 0,
    totalEntries: 0,
    totalWinnings: 0
  }

  ngOnInit() {
    this.getData();
    this.setValuesForUser();
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('LIVE')
    .subscribe( response => {
      console.log(response)
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser() {
    this.user.matchups = this.tableValues.length;
    this.tableValues.forEach(element => {
      this.user.totalEntries += element.entry;
      this.user.totalWinnings += element.winning;
    });
  }

}
