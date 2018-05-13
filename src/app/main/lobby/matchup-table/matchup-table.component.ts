import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-matchup-table',
  templateUrl: './matchup-table.component.html',
  styleUrls: ['./matchup-table.component.scss']
})
export class MatchupTable implements OnInit {

  constructor() { }

  players = [
    {
      id: 0,
      position: 'RB',
      name: 'David Johnson',
      team1: 'Ari',
      team2: 'Dal',
      opponent: 'Protocol81',
      fppg: 24.5,
      entry: 5,
      prize: 9,
      ranking: 'A'
    },
    {
      id: 1,
      position: 'RB',
      name: 'Ezekiel Elliot',
      team1: 'Ari',
      team2: 'Dal',
      opponent: 'Protocol81',
      fppg: 24.5,
      entry: 5,
      prize: 9,
      ranking: 'A'
    },
    {
      id: 1,
      position: 'RB',
      name: 'Ezekiel Elliot',
      team1: 'Ari',
      team2: 'Dal',
      opponent: 'Protocol81',
      fppg: 24.5,
      entry: 5,
      prize: 9,
      ranking: 'A'
    }
  ]
  scaleEntryFee = [ 0, 50000 ];;

  ngOnInit() {}
  
  entryFeeChange() {
console.log(this.scaleEntryFee)  }
}
