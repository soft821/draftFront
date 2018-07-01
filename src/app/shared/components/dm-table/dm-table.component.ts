import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-table',
  templateUrl: './dm-table.component.html',
  styleUrls: ['./dm-table.component.scss']
})
export class DmTable implements OnInit {
  @Input() theads;
  @Input() values;
  @Input() historyTable;
  @Input() matchups;
  @Output() cancelContest: EventEmitter<any> = new EventEmitter();
  @Output() editContest: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  
  cancelMatchup(option) {
    this.cancelContest.emit(option);
  }

  editMatchup(option) {
    this.editContest.emit(option);
  }
}
