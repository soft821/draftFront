import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-entry-fee',
  templateUrl: './entry-fee.component.html',
  styleUrls: ['./entry-fee.component.scss']
})
export class EntryFeeComponent implements OnInit {
  
  fees = [
    {id: 0, value: 'Free practice', prize: '', selected: false},
    {id: 1, value: 1, prize: 1.80, selected: false},
    {id: 2, value: 2, prize: 3.60, selected: false},
    {id: 3, value: 5, prize: 9, selected: false},
    {id: 4, value: 10, prize: 18, selected: false},
    {id: 5, value: 25, prize: 45, selected: false},
    {id: 6, value: 50, prize: 90, selected: false},
    {id: 7, value: 109, prize: 200, selected: false},
    {id: 8, value: 270, prize: 500, selected: false},
    {id: 9, value: 535, prize: 1000, selected: false},
    {id: 10, value: 1065, prize: 2000, selected: false},
    {id: 11, value: 5300, prize: 10000, selected: false},
    {id: 12, value: 10600, prize: 20000, selected: false}
  ];

  selectedFee = 0;
  selectedPrize = 0;

  @Input() feeSelected;
  @Output() getEntryFee: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(this.feeSelected !== -1) {
      let temp = this.fees.find(x => x.id === this.feeSelected);
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