import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-matchup-type',
  templateUrl: './matchup-type.component.html',
  styleUrls: ['./matchup-type.component.scss']
})
export class MatchupTypeComponent implements OnInit {
  selectedTypeId: number;

  options = [
    {
      id: 0,
      title: 'Any Challenger',
      selected: false,
      match_type: 'any_challenger'
    },
    {
      id: 1,
      title: 'Tier Ranked',
      selected: false,
      match_type: 'tier_ranked'
    },
    {
      id: 2,
      title: 'Set Opponent',
      selected: false,
      match_type: 'set_opponent'
    }
  ]

  @Input() matchType: string;
  @Output() getMatchupType: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if(this.matchType) {
      let temp = this.options.find(x => x.match_type === this.matchType);
      if(temp)
        this.matchupType(temp);
    }
  }

  selectMatchupType(option) {
    if(this.selectedTypeId !== option.id) {
      this.selectedTypeId = option.id;
      this.options.filter(x => x.id !== option.id).map(x => x.selected = false);
      this.options.filter(x => x.id === option.id).map(x => x.selected = true);
    } else {
      this.selectedTypeId = -1;
      this.options.map(x => x.selected = false);
    }
  }

  matchupType(option) {
    this.selectMatchupType(option);
    this.getMatchupType.emit(option);
  }

}
