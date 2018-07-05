import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GAME_TYPES, POSITIONS} from './filter-values';
import { ENTRY_FEE } from '../../create-contest/entry-fee/entryFeeValues';

@Component({
  selector: 'dm-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class DmFilterColumn implements OnInit {

  @Input() slates;
  @Input() slateSelected;
  @Input() gameSelected;
  @Input() gameTypeSelected;
  @Output() selectSlateOption: EventEmitter<any> = new EventEmitter;
  @Output() selectGameOption: EventEmitter<any> = new EventEmitter;
  @Output() selectGameTypeOption: EventEmitter<any> = new EventEmitter;
  @Output() selectPositionOption: EventEmitter<any> = new EventEmitter;
  @Output() selectEntryFeeOption: EventEmitter<any> = new EventEmitter;

  constructor(private router: Router) { }

  gameTypes: any[];
  positions: any[];

  scaleEntryFee = [ 0, 11 ];
  fees = [];

  minFee: any;
  maxFee: any;
  descriptionVisible: boolean;

  sliderConfig: any = {
    step: 1
  }

  ngOnInit() {
    this.gameTypes = GAME_TYPES;
    this.positions = POSITIONS;
    this.fees = ENTRY_FEE;
    this.filterValuesForGUI();
  }

  filterValuesForGUI() {
    this.minFee = this.fees.filter(x => x.id === this.scaleEntryFee[0]).map(x => x.value);
    this.maxFee = this.fees.filter(x => x.id === this.scaleEntryFee[1]).map(x => x.value);
  }

  goToCreateContest() {
    this.router.navigate(['main/create-contest']);
  }

  showDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }
  
  selectSlate(slate) {
    this.selectSlateOption.emit(slate);
  }

  selectGame(game) {
    this.selectGameOption.emit(game);
  }

  entryFeeChange() {
    this.filterValuesForGUI();
    let option = [this.minFee, this.maxFee];
    this.selectEntryFeeOption.emit(option);
  }

  selectPosition(position) {
    this.positions.forEach(element => {
      if(position.id === element.id) {
        element.selected = !element.selected;
      }
    });
    this.selectPositionOption.emit(this.positions);
  }

  selectGameType(gameType) {
    this.gameTypes.forEach(element => {
      if(element.id !== gameType.id) {
        element.selected = false;
      } else {
        element.selected = true;
        this.gameTypeSelected = element;
      }
    });
    this.selectGameTypeOption.emit(this.gameTypeSelected);
  }
}
