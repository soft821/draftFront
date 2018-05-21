import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-player-position',
  templateUrl: './player-position.component.html',
  styleUrls: ['./player-position.component.scss']
})
export class PlayerPositionComponent implements OnInit {
  selectedPositionId: number;
  options = [
    {
      id: 0,
      title: 'QB',
      description: 'Quarterback',
      selected: false,
    },
    {
      id: 1,
      title: 'RB',
      description: 'Runningback',
      selected: false,
    },
    {
      id: 2,
      title: 'WR',
      description: 'Wide Receiver',
      selected: false,
    },
    {
      id: 3,
      title: 'TE',
      description: 'Tight End',
      selected: false,
    },
    {
      id: 4,
      title: 'K',
      description: 'Kicker',
      selected: false,
    },
    {
      id: 5,
      title: 'DST',
      description: 'Defense & Special Teams',
      selected: false,
    }
  ];

  @Input() positionSelected;
  @Output() getPlayerPosition: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(this.positionSelected) {
      let temp = this.options.find(x => x.title === this.positionSelected);
      if(temp)
        this.selectPosition(temp);
    }
  }

  selectPosition(option) {
    if(this.selectedPositionId !== option.id) {
      this.selectedPositionId = option.id;
      this.options.filter(x => x.id !== option.id).map(x => x.selected = false);
      this.options.filter(x => x.id === option.id).map(x => x.selected = true);
    } else {
      this.selectedPositionId = -1;
      this.options.map(x => x.selected = false);
    }
  }

  position(option) {
    this.selectPosition(option);
    this.getPlayerPosition.emit(option);
  }

}
