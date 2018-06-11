import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HelperService} from '../../../core/helper.service';

@Component({
  selector: 'dm-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss']
})
export class SelectPlayerComponent implements OnInit {

  selectedPlayerId: number;
  direction = 'desc';
  sortDesc = true;

  @Input() players;
  @Output() getPlayer: EventEmitter<any> = new EventEmitter();
  @Output() getPlayers: EventEmitter<any> = new EventEmitter();

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.orderBy(this.direction, 'tier');
    this.getPlayers.emit();
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
    this.sortDesc = isDescending;
      if(isDescending) {
        this.players.sort(this.helperService.compareValues(key, 'desc'));
     } else {        
      this.players.sort(this.helperService.compareValues(key));
    } 
  }

  filterRanks(value) {
  //  this.players = this.players.filter(x => x.tier === 'A')
    
  }

}
