import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CreateContestService} from '../../create-contest/create-contest.service';

@Component({
  selector: 'dm-matchup-table',
  templateUrl: './matchup-table.component.html',
  styleUrls: ['./matchup-table.component.scss']
})
export class MatchupTable implements OnInit {

  constructor() { }
  @Input() tableData;
  @Output() enterMatchupEvent: EventEmitter<any> = new EventEmitter;

  scaleEntryFee = [ 0, 50000 ];

  ngOnInit() {
  }

  enterContest(item) {
    console.log(item)
    this.enterMatchupEvent.emit(item);
  }
  
  entryFeeChange() {
  }
}
