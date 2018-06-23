import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HelperService} from '../../../core/helper.service';
import {RANK_FILTER_VALUES} from './const-values';

@Component({
  selector: 'dm-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss']
})
export class SelectPlayerComponent implements OnInit {
  showRankFilter: boolean;
  showGameFilter: boolean;
  selectedPlayerId: number;
  sortDesc = false;
  rankFilterValues: any[];
  filter = {
    tier: [],
    game_id: []
  }
  sortFilter = {
    name: true,
    fps: false
  }
  @Input() playersUnsorted;
  @Input() players;
  @Input() gameFilterValues;
  @Output() getPlayer: EventEmitter<any> = new EventEmitter();
  @Output() getPlayers: EventEmitter<any> = new EventEmitter();

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.rankFilterValues = RANK_FILTER_VALUES;
    this.getPlayers.emit();
    this.filter['tier'] = this.rankFilterValues.filter(x => x.selected === true).map(x => x.value);
    this.filter['game_id'] = this.gameFilterValues.filter(x => x.selected === true).map(x => x.id); 
  }

  selectPlayer(option) {
    if(this.selectedPlayerId !== option.id) {
      this.selectedPlayerId = option.id;
      this.players.filter(x => x.id !== option.id).map(x => x.selected = false);
      this.players.filter(x => x.id === option.id).map(x => x.selected = true);
    } else {
      this.selectedPlayerId = -1;
      this.players.map(x => x.selected = false);
    }
    this.getPlayer.emit(option);
  }

  orderBy(isDescending, key) {
    this.sortFilter = this.helperService.setSortFilterProperties(this.sortFilter, key);
    this.sortDesc = isDescending;
      if(!isDescending) {
        this.players.sort(this.helperService.compareValues(key, 'desc'));
     } else {        
      this.players.sort(this.helperService.compareValues(key));
    } 
  }

  filterOptionSelected(value) {
    this.players =  this.helperService.filterOptionSelected(value, this.rankFilterValues, this.gameFilterValues, this.filter, this.players, this.playersUnsorted);
  }

  gameOptionSelected(value) {
    this.rankFilterValues.forEach(element => {
      if(value.id === element.id) {
        element = value;
      }
    });
    this.filter.game_id = this.gameFilterValues.filter(x => x.selected === true).map(x => x.id);   
    this.helperService.filterListBy(this.filter, this.players, this.playersUnsorted);
  }

}
