import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dm-summary',
  templateUrl: './dm-summary.component.html',
  styleUrls: ['./dm-summary.component.scss']
})
export class DmSummary implements OnInit {
  @Input() username;
  @Input() record;
  @Input() matchups;
  @Input() totalEntries;
  @Input() totalWinnings;
  @Input() matchup;

  constructor() { }

  ngOnInit() {}
  
}
