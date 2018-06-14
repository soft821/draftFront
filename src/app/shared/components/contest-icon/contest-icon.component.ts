import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-contest-icon',
  templateUrl: './contest-icon.component.html',
  styleUrls: ['./contest-icon.component.scss']
})
export class ContestIconComponent implements OnInit {
  @Input() isChecked;
  @Input() isLastOne;
  @Input() title;
  @Input() id;
  @Input() visible;
  @Output() selectedIcon: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  /* selectIcon(id) {
    this.selectedIcon.emit(id);
  } */
}
