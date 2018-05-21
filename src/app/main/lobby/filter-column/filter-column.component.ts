import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dm-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class DmFilterColumn implements OnInit {

  constructor(private router: Router) { }

  gameTypes = [
    {
      id: 0,
      selected: false,
      name: 'Any Challenger'
    },    
    {
      id: 1,
      selected: false,
      name: 'Tier Rank A'
    },    
    {
      id: 1,
      selected: false,
      name: 'Tier Rank B'
    },    
    {
      id: 1,
      selected: false,
      name: 'Tier Rank C'
    },    
    {
      id: 1,
      selected: false,
      name: 'Tier Rank D'
    },    
    {
      id: 1,
      selected: false,
      name: 'Set Opponent'
    }
  ];

  positions = [
    {
      id: 0,
      selected: false,
      name: 'QB'
    },
    {
      id: 1,
      selected: false,
      name: 'RB'
    },
    {
      id: 2,
      selected: false,
      name: 'WR'
    },
    {
      id: 3,
      selected: false,
      name: 'TE'
    },
    {
      id: 4,
      selected: false,
      name: 'K'
    },
    {
      id: 5,
      selected: false,
      name: 'DST'
    }
  ]
  scaleEntryFee = [ 0, 50000 ];;

  ngOnInit() {}

  goToCreateContest() {
    this.router.navigate(['main/create-contest']);
  }
  
  entryFeeChange() {
console.log(this.scaleEntryFee)  }
}
