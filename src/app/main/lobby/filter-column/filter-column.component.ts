import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dm-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class DmFilterColumn implements OnInit {

  @Input() slates;
  @Input() slateSelected;
  @Input() gameSelected;
  @Output() selectSlateOption: EventEmitter<any> = new EventEmitter;
  @Output() selectGameOption: EventEmitter<any> = new EventEmitter;

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
      id: 2,
      selected: false,
      name: 'Tier Rank B'
    },    
    {
      id: 3,
      selected: false,
      name: 'Tier Rank C'
    },    
    {
      id: 4,
      selected: false,
      name: 'Tier Rank D'
    },    
    {
      id:5,
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
  scaleEntryFee = [ 0, 10600 ];;
  descriptionVisible: boolean;
  ngOnInit() {}

  goToCreateContest() {
    this.router.navigate(['main/create-contest']);
  }

  showDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }
  
  selectSlate(slate) {
    this.selectSlateOption.emit(slate);
  }

  selectGame(game) {
    this.selectGameOption.emit(game);
  }

  entryFeeChange() {}

  selectPosition(position) {
    console.log(position)
  }
  selectGameType(gameType) {
    console.log(gameType)
    this.gameTypes.forEach(element => {
      if(element.id !== gameType.id) {
        element.selected = false;
      } else {
        element.selected = true;
      }
    });
  }
}
