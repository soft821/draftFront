import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.orderBy(this.direction);
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

  orderBy(isDescending) {
    this.sortDesc = isDescending;
    this.players.sort(function(a, b) {
      if(isDescending) {
        return b.salary - a.salary
      } else {        
        return a.salary - b.salary
      }
    })
  }
}
