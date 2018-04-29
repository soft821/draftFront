import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ResponsiveService} from '../../../core/responsive/responsive.service';

@Component({
  selector: 'dm-game-time',
  templateUrl: './game-time.component.html',
  styleUrls: ['./game-time.component.scss']
})
export class GameTimeComponent implements OnInit {
  @Input() gameTimes;
  @Input() matches;
  @Output() getGameTime: EventEmitter<any> = new EventEmitter();
  constructor(public responsiveService: ResponsiveService) { }

  ngOnInit() {
  }

  timeSelected(event) {
    this.getGameTime.emit(event);
  }
}
