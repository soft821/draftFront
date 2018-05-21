import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ResponsiveService} from '../../../core/responsive/responsive.service';

@Component({
  selector: 'dm-overview-contest',
  templateUrl: './overview-contest.component.html',
  styleUrls: ['./overview-contest.component.scss']
})
export class OverviewContestComponent implements OnInit {
 
  constructor(public responsiveService: ResponsiveService) { }

  @Input() contestData;
  @Output() selectedRow: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
  }

  editRow(option) {
    this.selectedRow.emit(option);
  }
}
