import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ResponsiveService} from '../../../core/responsive/responsive.service';

@Component({
  selector: 'dm-slate',
  templateUrl: './slate.component.html',
  styleUrls: ['./slate.component.scss']
})
export class SlateComponent implements OnInit {
  @Input() gameTimes;
  @Input() matches;
  @Input() pageLoaded;
  @Output() getGameTime: EventEmitter<any> = new EventEmitter();
  constructor(public responsiveService: ResponsiveService) { }

  ngOnInit() {
  }

  timeSelected(event) {
    this.getGameTime.emit(event);
  }
}
