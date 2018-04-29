import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-game-time',
  templateUrl: './game-time.component.html',
  styleUrls: ['./game-time.component.scss']
})
export class GameTimeComponent implements OnInit {
  @Input() gameTimes;
  @Input() matches;
  @Output() getGameTime: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  timeSelected(event) {
    this.getGameTime.emit(event);
  }
}
