import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-headline-matchup',
  templateUrl: './headline-matchup.component.html',
  styleUrls: ['./headline-matchup.component.scss']
})
export class HeadlineMatchup implements OnInit {

  constructor() { }
  @Input() players;
  @Input() match;
  @Output() confirmMatchupEvent: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
  }
  
  confirmMatchup(row) {
    this.confirmMatchupEvent.emit(row);
  }
}
