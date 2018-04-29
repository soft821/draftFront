import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ResponsiveService} from '../../../core/responsive/responsive.service';

@Component({
  selector: 'dm-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss']
})
export class CreateContestComponent implements OnInit {
 
  constructor(public responsiveService: ResponsiveService) { }

  @Input() contestData;
  @Output() selectedRow: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
  }

  editRow(option) {
    this.selectedRow.emit(option);
  }
}
