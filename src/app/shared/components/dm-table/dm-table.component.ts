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
  @Output() showModal: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}
  
  showConfirmModal() {
      this.showModal.emit();
  }
}
