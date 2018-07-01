import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { ENTRY_FEE } from './entryFeeValues';

@Component({
  selector: 'dm-entry-fee',
  templateUrl: './entry-fee.component.html',
  styleUrls: ['./entry-fee.component.scss']
})
export class EntryFeeComponent implements OnInit {
  
  fees = [];

  selectedFee = 0;
  selectedPrize = 0;

  @Input() feeSelected;
  @Output() getEntryFee: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.fees = ENTRY_FEE;
    this.fees.forEach(fee => {
      fee.selected = false;
    });
    if(this.feeSelected && this.feeSelected.id && this.feeSelected.id !== -1) {
      let temp = this.fees.find(x => x.id === this.feeSelected.id);
      if(temp)
        this.selectFee(temp);
    }
  }

  selectFee(option, event?) {
    if(option.id === 0) {
      this.selectedFee = 0;
      this.selectedPrize = 0;
    } else {
      this.selectedFee = option.value;
      this.selectedPrize = option.prize;
    }
    
    this.fees.filter(x => x.id !== option.id).map(x => x.selected = false);
    if(event) {
      this.fees.filter(x => x.id === option.id).map(x => x.selected = event.srcElement.checked);
    } else {
      this.fees.filter(x => x.id === option.id).map(x => x.selected = true);
    }
  }

  entryFee(option, event) {
    this.selectFee(option, event);
    this.getEntryFee.emit(option);
  }
}
