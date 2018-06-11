import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-matchup-type',
  templateUrl: './matchup-type.component.html',
  styleUrls: ['./matchup-type.component.scss']
})
export class MatchupTypeComponent implements OnInit {
  selectedTypeId = -1;

  options = [
    {
      id: 0,
      title: 'Any Challenger',
      selected: false,
      match_type: 'any_challenger',
      description: 'Opponent may select any player of the same position, except the player you selected to compete in this matchup.'
    },
    {
      id: 1,
      title: 'Tier Ranked',
      selected: false,
      match_type: 'tier_ranking',
      description: "Opponent may select a player within the same Tier Rank based off DraftMatch's ranking system."
    },
    {
      id: 2,
      title: 'Set Opponent',
      selected: false,
      match_type: 'set_opponent',
      description: 'You select a player for your opponent. It will be up to other users to pick up matchup based off your selection.'
    }
  ]
  selectedOptionDescription: string;

  @Input() matchType: any;  ;
  @Output() getMatchupType: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if(this.matchType && this.matchType.type) {
      let temp = this.options.find(x => x.match_type === this.matchType.type);
      if(temp)
        this.matchupType(temp);
    }
  }

  selectMatchupType(option) {
    if(this.selectedTypeId !== option.id) {
      this.selectedTypeId = option.id;
      this.selectedOptionDescription = option.description;
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
