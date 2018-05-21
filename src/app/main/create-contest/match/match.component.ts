import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'dm-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match;
  @Input() isLastOne;
  @Input() title;
  constructor() { }

  ngOnInit() {
  }

}
