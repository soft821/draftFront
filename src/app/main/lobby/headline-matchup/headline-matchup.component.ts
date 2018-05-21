import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-headline-matchup',
  templateUrl: './headline-matchup.component.html',
  styleUrls: ['./headline-matchup.component.scss']
})
export class HeadlineMatchup implements OnInit {

  constructor() { }
  @Output() confirmMatchupEvent: EventEmitter<any> = new EventEmitter;
  players = [
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
  scaleEntryFee = [ 0, 50000 ];;

  ngOnInit() {}
  
  confirmMatchup() {
    this.confirmMatchupEvent.emit();
  }
  entryFeeChange() {
console.log(this.scaleEntryFee)  }
}
