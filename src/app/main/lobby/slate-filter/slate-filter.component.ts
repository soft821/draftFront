import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-slate-filter',
  templateUrl: './slate-filter.component.html',
  styleUrls: ['./slate-filter.component.scss']
})
export class SlateFilterComponent implements OnInit {

  constructor() { }
  @Input() slates;
  @Input() slateSelected;
  @Input() gameSelected;
  @Output() selectSlate: EventEmitter<any> = new EventEmitter;
  @Output() selectGame: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
  }
  showGames: boolean;
  selectSlateFromList(slate) {
    this.selectSlate.emit(slate);
  }

  selectGameFromList(game) {
    this.selectGame.emit(game);
  }
  
}
