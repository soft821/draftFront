import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {

  constructor() { }
  @Input() items;
  @Input() isRank;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter;

  selectAll = true;
  ngOnInit() {
  }

  selectAllOptions() {
    this.selectAll = !this.selectAll;
    console.log(this.selectAll)
    this.items.forEach(item => {
      item.selected = this.selectAll;
      this.optionSelected.emit(item);
    });
  }

  selectRank(option) {
    option.selected = !option.selected;
    this.optionSelected.emit(option);
  }

}
